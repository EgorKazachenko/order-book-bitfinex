import {
  all,
  call,
  delay,
  fork,
  join,
  put,
  race,
  select,
  take,
  takeLatest,
} from 'typed-redux-saga';
import { ActionType } from 'typesafe-actions';

import {
  DataSourceSubscription,
  EventPayloadT,
  InfoEventPayloadT,
  OrderT,
  RawOrderRecordT,
  RecordEventPayloadT,
  SagasDIContainerT,
} from '../../types';
import {
  enableDataSource,
  initialOrdersReceived,
  ordersReceived,
  selectDataSourceEnabled,
  selectWSThrottle,
  selectWSUrl,
  wsThrottleChanged,
} from '../../store';
import { WSDataSourceService } from '../../services';
import { buffers, EventChannel, eventChannel } from 'redux-saga';
import { mapRawOrderToOrder } from '../../utils';

export function* dataSourceSaga(container: SagasDIContainerT) {
  yield* takeLatest(enableDataSource.request, handler, container);
}

function* handler(
  { loggerService }: SagasDIContainerT,
  _: ActionType<typeof enableDataSource.request>,
) {
  try {
    const wsUrl = yield* select(selectWSUrl);

    const dataSourceService = new WSDataSourceService({
      uri: wsUrl,
      loggerService,
    });

    const dataSourceProxyT = yield* fork(dataSourceProxy, { loggerService }, dataSourceService);

    yield* all([take(enableDataSource.cancel), join(dataSourceProxyT)]);

    if (dataSourceProxyT.isRunning()) {
      dataSourceProxyT.cancel();
    }
  } catch (e) {
    loggerService.error('dataSourceSaga -> handler ', e);

    yield* put(enableDataSource.failure('DataSource initialization error'));
  }
}

function* dataSourceProxy(
  { loggerService }: SagasDIContainerT,
  dataSourceService: WSDataSourceService,
) {
  try {
    loggerService.info('dataSourceProxy -> initialization');

    yield* call(dataSourceService.waitForConnection);

    const channelBuffer = buffers.expanding<EventPayloadT>();

    const channel = eventChannel((intoBuffer) => {
      const sub: DataSourceSubscription = (e) => intoBuffer(e);

      dataSourceService.subscribe(sub);

      return dataSourceService.unsubscribe;
    }, channelBuffer);

    while (true) {
      const wsThrottle = yield* select(selectWSThrottle);

      yield* race([take(wsThrottleChanged), delay(wsThrottle)]);

      /*
        I know that we can use something like yield* takeEvery(chan, ... -> put(message)) but
        in case of 1000 or more messages (is it possible?) per 1000ms (for example) batch with flushed
        messages is better. So i decided to collect messages and for 'real time' option
        dispatch an action for update every 100ms. The user won't notice the difference, but the risk
        of poor performance is avoided for our widget.
       */
      const messages = yield* call(flushMessages, channel);

      const dataSourceEnabled = yield* select(selectDataSourceEnabled);

      if (!dataSourceEnabled) {
        const target = messages.find((m) => (m as InfoEventPayloadT).event === 'subscribed');

        if (target) {
          yield* put(enableDataSource.success());
        }
      }

      /*
        HB, CS etc. will be skipped. Out of task's scope i think
       */
      const messagesToHandle = messages
        .filter((m) => typeof (m as RecordEventPayloadT)[1] === 'object')
        .map((recordEventPayload) => (recordEventPayload as RecordEventPayloadT)[1]);

      if (!messagesToHandle.length) {
        continue;
      }

      /*
        Let's assume that a message of this type comes once at the beginning.
        More complex checks could be made.
       */
      if (typeof messagesToHandle[0][0] === 'object') {
        const initialOrders: OrderT[] = (messagesToHandle[0] as unknown as RawOrderRecordT[]).map(
          mapRawOrderToOrder,
        );

        yield* put(initialOrdersReceived(initialOrders));

        const [, ...rawOrders] = messagesToHandle as [RawOrderRecordT[], RawOrderRecordT];

        if (rawOrders.length) {
          yield* processRawOrders(rawOrders);
        }
      } else {
        if (messagesToHandle.length) {
          yield* processRawOrders(messagesToHandle as RawOrderRecordT[]);
        }
      }
    }
  } catch (e) {
    loggerService.error('dataSourceSaga -> dataSourceProxy ', e);

    throw e;
  }
}

function* processRawOrders(rawOrders: RawOrderRecordT[]) {
  const ordersMapped = rawOrders.map(mapRawOrderToOrder);

  yield* put(ordersReceived(ordersMapped));
}

const flushMessages = async (chan: EventChannel<EventPayloadT>): Promise<EventPayloadT[]> => {
  const messages = await new Promise((res) => {
    chan.flush(res);
  });

  /*
    END can be ignored here
   */
  return messages as EventPayloadT[];
};
