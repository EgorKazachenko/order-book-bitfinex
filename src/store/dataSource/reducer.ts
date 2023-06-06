import * as DataSourceActions from './actions';
import { ActionType, createReducer } from 'typesafe-actions';

import { DataSourceStateT } from '../../types';

type DataSourceAction = ActionType<typeof DataSourceActions>;

const initialState: DataSourceStateT = {
  dataSourceConnected: false,
  dataSourceConnectionPending: false,
};

export const dataSourceReducer = createReducer<DataSourceStateT, DataSourceAction>(initialState, {
  ENABLE_DATA_SOURCE_REQUEST: (state) => ({
    ...state,
    dataSourceConnectionError: undefined,
    dataSourceConnected: false,
    dataSourceConnectionPending: true,
  }),
  ENABLE_DATA_SOURCE_SUCCESS: (state) => ({
    ...state,
    dataSourceConnected: true,
    dataSourceConnectionPending: false,
  }),
  ENABLE_DATA_SOURCE_FAILURE: (state, { payload }) => ({
    ...state,
    dataSourceConnectionPending: false,
    dataSourceConnectionError: payload,
  }),
});
