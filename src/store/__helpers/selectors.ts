import { useSelector, TypedUseSelectorHook } from 'react-redux';

import { StateT } from '../../types';

type SelectStateSliceApiT = {
  [P in keyof StateT & string as `select${Capitalize<P>}Slice`]: (s: StateT) => StateT[P];
};

export const stateSliceSelector: SelectStateSliceApiT = {
  selectAppStateSlice: (s) => s.appState,
  selectDataSourceStateSlice: (s) => s.dataSourceState,
  selectOrdersStateSlice: (s) => s.ordersState,
};

export const useTypedSelector: TypedUseSelectorHook<StateT> = useSelector;
