import { useCallback } from 'react';

import { useAppDispatch } from '../../__helpers';
import { enableDataSource } from '../actions';

export const useDataSourceActions = () => {
  const d = useAppDispatch();

  const handleConnectDataSource = useCallback(() => {
    d(enableDataSource.request());
  }, [d]);

  const handleDisconnectDataSource = useCallback(() => {
    d(enableDataSource.cancel());
  }, [d]);

  return {
    handleConnectDataSource,
    handleDisconnectDataSource,
  };
};
