import { useCallback } from 'react';

import { useAppDispatch } from '../../__helpers';
import { wsThrottleChanged } from '../actions';
import { WSThrottleT } from '../../../types';

export const useAppActions = () => {
  const d = useAppDispatch();

  const handleWSThrottleChanged = useCallback(
    (p: WSThrottleT) => {
      d(wsThrottleChanged(p));
    },
    [d],
  );

  return {
    handleWSThrottleChanged,
  };
};
