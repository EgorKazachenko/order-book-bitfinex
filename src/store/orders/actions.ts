import { createAction } from 'typesafe-actions';

import { OrderT } from '../../types';

export const initialOrdersReceived = createAction('INITIAL_ORDERS_RECEIVED')<OrderT[]>();
export const ordersReceived = createAction('ORDERS_RECEIVED')<OrderT[]>();
