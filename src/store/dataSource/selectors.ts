import { stateSliceSelector } from '../__helpers';
import { StateT } from '../../types';

const { selectDataSourceStateSlice } = stateSliceSelector;

export const selectDataSourceEnabled = (state: StateT) =>
  selectDataSourceStateSlice(state).dataSourceConnected;
export const selectDataSourceConnectionPending = (state: StateT) =>
  selectDataSourceStateSlice(state).dataSourceConnectionPending;
export const selectDataSourceConnectionError = (state: StateT) =>
  selectDataSourceStateSlice(state).dataSourceConnectionError;
