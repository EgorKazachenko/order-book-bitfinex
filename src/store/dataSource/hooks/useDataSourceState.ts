import { useTypedSelector } from '../../__helpers';
import {
  selectDataSourceConnectionError,
  selectDataSourceConnectionPending,
  selectDataSourceEnabled,
} from '../selectors';

export const useDataSourceState = () => {
  const dataSourceEnabled = useTypedSelector(selectDataSourceEnabled);
  const dataSourceConnectionPending = useTypedSelector(selectDataSourceConnectionPending);
  const dataSourceConnectionError = useTypedSelector(selectDataSourceConnectionError);

  return {
    dataSourceEnabled,
    dataSourceConnectionPending,
    dataSourceConnectionError,
  };
};
