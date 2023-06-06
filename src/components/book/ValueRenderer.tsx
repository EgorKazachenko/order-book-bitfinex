import { FC } from 'react';

import './ValueRenderer.scss';

type Props = {
  value: number;
  requiredCharsAmount?: number;
};
export const ValueRenderer: FC<Props> = ({ value, requiredCharsAmount = 0 }) => {
  const formatted = (Number((value * 10000).toFixed(0)) / 10000).toFixed(requiredCharsAmount);

  return <span className='ValueRenderer'>{formatted}</span>;
};
