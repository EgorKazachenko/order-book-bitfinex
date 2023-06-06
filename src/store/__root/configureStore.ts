import { combineReducers } from 'redux';
import { SagaMiddleware } from 'redux-saga';
import { configureStore } from '@reduxjs/toolkit';
import {
  Persistor,
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import DefaultStorage from 'redux-persist/lib/storage';

import { ConfigT, SagaConfiguratorT, StateT, StoreAPIT } from '../../types';
import { appReducer } from '../app';
import { dataSourceReducer } from '../dataSource';
import { LoggerService } from '../../services';
import { ordersReducer } from '../orders';

type StoreReqs = {
  reduxSagaMiddleware: SagaMiddleware;
  config: ConfigT;
  loggerService: LoggerService;
} & SagaConfiguratorT;
export const initStore = async ({
  reduxSagaMiddleware,
  rootSaga,
  sagaObservers,
  loggerService,
}: StoreReqs): Promise<StoreAPIT> => {
  const rootReducer = combineReducers({
    appState: appReducer,
    dataSourceState: dataSourceReducer,
    ordersState: ordersReducer,
  });

  const rootBlacklist: Array<keyof StateT> = ['appState', 'dataSourceState', 'ordersState'];

  const persistedRootReducer = persistReducer(
    {
      storage: DefaultStorage,
      key: '__entry-persist',
      blacklist: rootBlacklist,
    },
    rootReducer,
  );

  const store = configureStore({
    reducer: persistedRootReducer,
    middleware: (def) =>
      def({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(reduxSagaMiddleware),
    devTools: true,
  });

  const persistor = await new Promise<Persistor>(async (res) => {
    const persistedStore = persistStore(store, undefined, () => {
      /*
        Here we can initialize such services as AuthService, SessionsCountService etc. using persisted values
        and add them via DI to the saga dependencies.
       */
      reduxSagaMiddleware.run(rootSaga, {
        sagaObservers,
        loggerService,
      });

      res(persistedStore);
    });
  });

  return {
    store,
    persistor,
  };
};
