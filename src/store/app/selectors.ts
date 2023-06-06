import { stateSliceSelector } from '../__helpers';
import { StateT } from '../../types';

const { selectAppStateSlice } = stateSliceSelector;

export const selectWSThrottle = (state: StateT) => selectAppStateSlice(state).wsThrottle;

export const selectWSUrl = (state: StateT) => selectAppStateSlice(state).wsURL;
