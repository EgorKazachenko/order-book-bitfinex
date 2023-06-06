import { FC } from 'react';

import { OrderT, OrderTypeT } from '../../types';
import { Record } from './Record';

import './RecordsList.scss';

type Props = {
  records: OrderT[];
  ordersType: OrderTypeT;
  maxVolumeDeviation: number;
};
export const RecordsList: FC<Props> = ({ ordersType, records, maxVolumeDeviation }) => {
  return (
    <div className='RecordsList'>
      {records.map((record, index) => {
        const total = records.reduce((acc, cur, i) => {
          if (i > index) {
            return acc;
          }
          return acc + cur.amount;
        }, 0);

        return (
          <Record
            key={record.price}
            orderType={ordersType}
            order={record}
            total={total}
            maxVolumeDeviation={maxVolumeDeviation}
          />
        );
      })}
    </div>
  );
};
