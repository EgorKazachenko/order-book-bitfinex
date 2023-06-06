import { FC } from 'react';

import { OrderBook } from './OrderBook';
import { useAppActions, useWSThrottle } from '../../store';

import './OrderBookWidget.scss';
import { WS_THROTTLE_TO_TITLE } from '../../constants';

export const OrderBookWidget: FC = () => {
  const { wsThrottle } = useWSThrottle();
  const { handleWSThrottleChanged } = useAppActions();

  return (
    <div className='OrderBookWidget'>
      <div className='OrderBookWidget_OrderBookWrap'>
        <OrderBook />
      </div>
      <div className='OrderBookWidget_ButtonsWrap'>
        <div>
          <button disabled={wsThrottle === 100} onClick={() => handleWSThrottleChanged(100)}>
            {WS_THROTTLE_TO_TITLE[100]}
          </button>
        </div>
        <div>
          <button disabled={wsThrottle === 5000} onClick={() => handleWSThrottleChanged(5000)}>
            {WS_THROTTLE_TO_TITLE[5000]}
          </button>
        </div>
      </div>
    </div>
  );
};
