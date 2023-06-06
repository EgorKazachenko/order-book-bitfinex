import { Persistor } from 'redux-persist';
import { Store } from 'redux';
import { Saga } from 'redux-saga';

import { LoggerService } from '../../services';

export type StoreAPIT = {
  store: Store;
  persistor: Persistor;
};

export type RootSagaDIContainerT = {
  sagaObservers: Saga<[SagasDIContainerT]>[];
  loggerService: LoggerService;
};

export type SagasDIContainerT = Omit<RootSagaDIContainerT, 'sagaObservers'>;

export type SagaConfiguratorT = {
  rootSaga: Saga<[RootSagaDIContainerT]>;
  sagaObservers: Saga<[SagasDIContainerT]>[];
};
