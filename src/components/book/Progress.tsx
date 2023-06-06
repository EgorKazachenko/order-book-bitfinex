import { FC } from 'react';

import './Progress.scss';

type Props = {
  percentage: number;
  color: string;
};
export const Progress: FC<Props> = ({ percentage, color }) => {
  return (
    <div className='Progress'>
      <div
        className='Progress_Bar'
        style={{ width: `${percentage || 1}%`, background: color }}
      ></div>
    </div>
  );
};
