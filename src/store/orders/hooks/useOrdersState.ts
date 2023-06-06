import { useTypedSelector } from '../../__helpers';
import { selectAsks, selectBids } from '../selectors';

export const useOrdersState = () => {
  const asks = useTypedSelector(selectAsks);
  const bids = useTypedSelector(selectBids);

  const maxVolumeDeviation =
    asks !== undefined && bids !== undefined
      ? Math.max(
          asks.reduce((acc, cur) => acc + cur.amount, 0),
          bids.reduce((acc, cur) => acc + cur.amount, 0),
        )
      : 0;

  return {
    asks,
    bids,
    maxVolumeDeviation,
  };
};
