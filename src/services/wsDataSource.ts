import { DataSourceSubscription, EventPayloadT, InfoEventPayloadT } from '../types';

import { LoggerService } from './logger';

interface Deps {
  uri: string;
  loggerService: LoggerService;
}
export class WSDataSourceService implements Deps {
  public readonly uri: string;

  public readonly loggerService: LoggerService;

  private chanId?: number;

  private ws: WebSocket;
  constructor({ uri, loggerService }: Deps) {
    this.uri = uri;
    this.loggerService = loggerService;
    this.ws = new WebSocket(this.uri);
  }

  public waitForConnection = async () => {
    /*
      Also onerror can be handled inside sagas to reconnect if needed. Not implemented here
     */
    if (this.ws.readyState !== this.ws.OPEN) {
      await new Promise((res, rej) => {
        this.ws.onopen = res;
        this.ws.onerror = rej;
      });
    }
  };

  public subscribe(s: DataSourceSubscription) {
    if (this.ws.readyState !== this.ws.OPEN) {
      this.loggerService.error(`WSDataSourceService -> subscribe: WS isn't opened`);

      throw new Error(`WS isn't initialized`);
    }

    this.ws.onmessage = (e) => {
      try {
        const data = JSON.parse(e.data) as EventPayloadT;

        if ((data as InfoEventPayloadT).event === 'subscribed') {
          this.chanId = (data as InfoEventPayloadT<'subscribed'>).chanId;
        }

        s(data);
      } catch (e) {
        this.loggerService.error('WSDataSourceService onmessage -> ', e);
      }
    };

    this.ws.send(
      JSON.stringify({
        event: 'subscribe',
        channel: 'book',
        symbol: 'tBTCUSD',
      }),
    );
  }

  public unsubscribe() {
    if (!this.chanId) {
      this.loggerService.error('WSDataSourceService -> unsubscribe: there is no chanId');

      return;
    }

    this.ws.send(
      JSON.stringify({
        event: 'unsubscribe',
        chanId: this.chanId,
      }),
    );
  }
}
