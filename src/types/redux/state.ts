import { OrdersBookT } from '../orders';
import { WSThrottleT } from '../dataSource';

export type StateT = {
  appState: AppStateT;
  dataSourceState: DataSourceStateT;
  ordersState: OrdersStateT;
};

export type AppStateT = {
  wsThrottle: WSThrottleT;
  wsURL: string;
};

export type DataSourceStateT = {
  dataSourceConnectionPending: boolean;
  dataSourceConnected: boolean;
  dataSourceConnectionError?: string;
};

export type OrdersStateT = {
  orders?: OrdersBookT;
};
