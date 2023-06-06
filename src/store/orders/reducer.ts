import * as OrdersActions from './actions';
import { ActionType, createReducer } from 'typesafe-actions';
import { persistReducer } from 'redux-persist';

import { OrdersStateT } from '../../types';
import { makeReducerPersistConfig } from '../__helpers';
import { applyOrdersToBook } from '../../utils';

type OrdersAction = ActionType<typeof OrdersActions>;

const initialState: OrdersStateT = {};

export const ordersReducer = persistReducer(
  makeReducerPersistConfig({ namespace: 'ordersState', whitelist: ['orders'] }),
  createReducer<OrdersStateT, OrdersAction>(initialState, {
    INITIAL_ORDERS_RECEIVED: (state, { payload }): OrdersStateT => {
      const ordersToApply = applyOrdersToBook(payload);

      return {
        ...state,
        orders: ordersToApply,
      };
    },
    ORDERS_RECEIVED: (state, { payload }): OrdersStateT => {
      return {
        ...state,
        orders: applyOrdersToBook(payload, state.orders),
      };
    },
  }),
);
