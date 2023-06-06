import { useTypedSelector } from '../../__helpers';
import { selectWSThrottle } from '../selectors';

export const useWSThrottle = () => {
  const wsThrottle = useTypedSelector(selectWSThrottle);

  return {
    wsThrottle,
  };
};
