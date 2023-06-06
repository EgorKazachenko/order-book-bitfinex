import { useEffect, useState } from 'react';
import createSagaMiddleware from 'redux-saga';

import { initStore } from '../../store';
import { ConfigT, SagaConfiguratorT, StoreAPIT } from '../../types';
import { LoggerService } from '../../services';

type Deps = {
  config: ConfigT;
  loggerService: LoggerService;
};

type StateMachine<IsAppReady = boolean> = {
  isAppReady: IsAppReady;
  reduxAPI: IsAppReady extends true ? StoreAPIT : undefined;
};
export const useSmartStore = <IsAppReady = boolean>({
  config,
  rootSaga,
  sagaObservers,
  loggerService,
}: Deps & SagaConfiguratorT): StateMachine<IsAppReady> => {
  /*
    Error handling can be added here (setError inside catch)
   */
  const [smartStore, setSmartStore] = useState<StateMachine<IsAppReady>>({
    isAppReady: false,
    reduxAPI: undefined,
  } as StateMachine<IsAppReady>);

  useEffect(() => {
    const buildStore = async () => {
      try {
        const reduxSagaMiddleware = createSagaMiddleware({
          // onError: (error, errorInfo) => {
          //   loggerService.error('reduxSagaMiddleware -> ', error, errorInfo);
          // },
        });

        const api = await initStore({
          reduxSagaMiddleware,
          config,
          sagaObservers,
          rootSaga,
          loggerService,
        });

        setSmartStore({
          isAppReady: true,
          reduxAPI: api,
        } as StateMachine<IsAppReady>);
      } catch (e) {
        loggerService.error('buildStore -> ', e);
      }
    };

    buildStore();
  }, [config, rootSaga, sagaObservers]);

  return smartStore;
};
