import { FC } from 'react';
import cx from 'classnames';

import { OrderT, OrderTypeT } from '../../types';
import { EXTRA_COLOR_BY_ORDER_TYPE, HUMBLE_COLOR_BY_ORDER_TYPE } from '../../constants';

import { ValueRenderer } from './ValueRenderer';
import { Progress } from './Progress';

import './Record.scss';

type Props = {
  orderType: OrderTypeT;
  order: OrderT;
  total: number;
  maxVolumeDeviation: number;
};
export const Record: FC<Props> = ({ order, maxVolumeDeviation, total, orderType }) => {
  const rootClassName = cx('Record', {
    'Record--inverted': orderType === 'ask',
  });

  return (
    <div className={rootClassName}>
      <div className='Record_MountedMaskWrap'>
        <MountedMask color={EXTRA_COLOR_BY_ORDER_TYPE[orderType]} />
      </div>
      <div className='Record_ProgressWrap'>
        <Progress
          percentage={Math.round((total / maxVolumeDeviation) * 100)}
          color={HUMBLE_COLOR_BY_ORDER_TYPE[orderType]}
        />
      </div>
      <div className='Record_ValueWrap'>
        <ValueRenderer value={order.count} />
      </div>
      <div className='Record_ValueWrap'>
        <ValueRenderer value={order.amount} requiredCharsAmount={4} />
      </div>
      <div className='Record_ValueWrap'>
        <ValueRenderer value={total} requiredCharsAmount={4} />
      </div>
      <div className='Record_ValueWrap'>
        <ValueRenderer value={order.price} />
      </div>
    </div>
  );
};

type MMProps = {
  color: string;
};
const MountedMask: FC<MMProps> = ({ color }) => {
  return <div className='MountedMask' style={{ background: color }} />;
};
