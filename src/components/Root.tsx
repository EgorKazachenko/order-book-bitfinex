import { FC } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { ConfigT, StoreAPIT } from '../types';
import { useSmartStore } from '../hooks';
import { rootSaga } from '../sagas';
import { LoggerService } from '../services';
import { OrderBookWidget } from './book';
import { dataSourceSaga } from '../sagas';

type Props = {
  config: ConfigT;
};

/*
  Can be configurable inside component if needed
 */
const sagaObservers = [dataSourceSaga];
export const Root: FC<Props> = ({ config }) => {
  const loggerService = new LoggerService(config.loggerName);

  const { isAppReady, reduxAPI } = useSmartStore({
    config,
    rootSaga,
    sagaObservers,
    loggerService,
  });

  if (!isAppReady) {
    /*
      If the task is long, then you can show the skeleton loader or do whatever you want.

      Here we can handle cases when store's reconfiguration is needed (config changed, auth etc.)
     */
    return null;
  }

  const casted = reduxAPI as StoreAPIT;

  return (
    <Provider store={casted.store}>
      {/* I think loading prop here is not such useful as isAppReady */}
      <PersistGate persistor={casted.persistor} loading={null}>
        <main>
          <OrderBookWidget />
        </main>
      </PersistGate>
    </Provider>
  );
};
