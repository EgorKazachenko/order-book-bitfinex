import { createAsyncAction } from 'typesafe-actions';

export const enableDataSource = createAsyncAction(
  'ENABLE_DATA_SOURCE_REQUEST',
  'ENABLE_DATA_SOURCE_SUCCESS',
  'ENABLE_DATA_SOURCE_FAILURE',
  'ENABLE_DATA_SOURCE_CANCELED',
)<void, void, string, void>();
