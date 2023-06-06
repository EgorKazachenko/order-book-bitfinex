import { all, spawn } from 'typed-redux-saga';
import { omit } from 'lodash';

import { RootSagaDIContainerT } from '../types';

export function* rootSaga(container: RootSagaDIContainerT) {
  const restrictedContainer = omit(container, 'sagaObservers');

  /*
    Sagas by domain will be spawned with API (services etc.)
   */
  yield* all(container.sagaObservers.map((s) => spawn(s, restrictedContainer)));
}
