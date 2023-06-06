import * as AppActions from './actions';
import { ActionType, createReducer } from 'typesafe-actions';
import { persistReducer } from 'redux-persist';

import { AppStateT } from '../../types';
import { makeReducerPersistConfig } from '../__helpers';

type AppAction = ActionType<typeof AppActions>;

const initialState: AppStateT = {
  wsThrottle: 100,
  wsURL: process.env.REACT_APP_WS_URL as string,
};

export const appReducer = persistReducer(
  makeReducerPersistConfig({ namespace: 'appState', whitelist: ['wsThrottle'] }),
  createReducer<AppStateT, AppAction>(initialState, {
    WS_THROTTLE_CHANGED: (state, { payload }) => ({
      ...state,
      wsThrottle: payload,
    }),
  }),
);
