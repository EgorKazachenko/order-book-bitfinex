import { stateSliceSelector } from '../__helpers';
import { StateT } from '../../types';
import { createSelector } from 'reselect';
import { reverse, sortBy } from 'lodash';

const { selectOrdersStateSlice } = stateSliceSelector;

export const selectOrders = (state: StateT) => selectOrdersStateSlice(state).orders;

export const selectBids = createSelector(
  (state: StateT) => selectOrders(state)?.bid,
  (bids) => {
    if (!bids) {
      return undefined;
    }

    const sorted = reverse(sortBy(bids, 'price'));

    return sorted;
  },
);
export const selectAsks = createSelector(
  (state: StateT) => selectOrders(state)?.ask,
  (asks) => {
    if (!asks) {
      return undefined;
    }

    const sorted = sortBy(asks, 'price');

    return sorted;
  },
);
