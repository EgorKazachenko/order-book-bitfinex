import { FC, useEffect } from 'react';

import {
  useDataSourceActions,
  useDataSourceState,
  useOrdersState,
  useWSThrottle,
} from '../../store';
import { RecordsList } from './RecordsList';

import './OrderBook.scss';
import { WS_THROTTLE_TO_TITLE } from '../../constants';
export const OrderBook: FC = () => {
  const { handleConnectDataSource, handleDisconnectDataSource } = useDataSourceActions();

  const { wsThrottle } = useWSThrottle();

  const { dataSourceConnectionPending, dataSourceConnectionError, dataSourceEnabled } =
    useDataSourceState();

  const { asks, bids, maxVolumeDeviation } = useOrdersState();

  useEffect(() => {
    handleConnectDataSource();

    return () => {
      handleDisconnectDataSource();
    };
  }, []);

  return (
    <div className='OrderBook'>
      <div className='OrderBook_StatusWrap'>
        <p className='OrderBook_Status'>
          {dataSourceConnectionPending && 'Connection in progress... 🟡'}
          {dataSourceEnabled && `Connected 🟢 ${WS_THROTTLE_TO_TITLE[wsThrottle]}`}
          {dataSourceConnectionError && `Error: ${dataSourceConnectionError} 🔴`}
        </p>
      </div>
      <div className='OrderBook_RecordsWrap'>
        {bids && (
          <RecordsList ordersType='bid' records={bids} maxVolumeDeviation={maxVolumeDeviation} />
        )}
        {asks && (
          <RecordsList ordersType='ask' records={asks} maxVolumeDeviation={maxVolumeDeviation} />
        )}
      </div>
    </div>
  );
};
