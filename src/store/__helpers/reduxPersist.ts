import DefaultStorage from 'redux-persist/lib/storage';

import { StateT } from '../../types';

type PersistConfigDepsT<StateSlice extends keyof StateT> = {
  whitelist: Array<keyof StateT[StateSlice]>;
  namespace: StateSlice;
};
export const makeReducerPersistConfig = <StateSlice extends keyof StateT = keyof StateT>(
  deps: PersistConfigDepsT<StateSlice>,
) => {
  return {
    key: `____${deps.namespace}`,
    whitelist: deps.whitelist,
    storage: DefaultStorage,
  };
};
