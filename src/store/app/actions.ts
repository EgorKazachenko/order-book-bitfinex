import { createAction } from 'typesafe-actions';

import { WSThrottleT } from '../../types';

export const wsThrottleChanged = createAction('WS_THROTTLE_CHANGED')<WSThrottleT>();
