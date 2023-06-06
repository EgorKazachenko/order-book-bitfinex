import { OrdersBookT, OrderT, OrderTypeT, RawOrderRecordT } from '../types';
import { omit } from 'lodash';

/*
  Such thing should be implemented using models.

  class Order implements OrderT {
    constructor(rawOrder) {
      this.amount = rawOrder[...]
      etc.
    }
  }

  It is so useful because we can implement such things as

  get bidType(): BidTypeT {
    ...
    const bidType = {A tot of logic}
    ...
    return bidType;
  }

  + a lot of useful things :)

  These entities can be stored into redux if transforms for persist are provided.

  But here it is overhead
 */
export const mapRawOrderToOrder = (rawOrder: RawOrderRecordT): OrderT => {
  return {
    price: rawOrder[0],
    count: rawOrder[1],
    amount: rawOrder[2],
  };
};

export const getTypeByOrder = (order: OrderT): OrderTypeT => {
  return order.amount >= 0 ? 'bid' : 'ask';
};

export const applyOrdersToBook = (orders: OrderT[], book?: OrdersBookT): OrdersBookT => {
  const bookToProcess: OrdersBookT = book || {
    ask: {},
    bid: {},
  };

  return orders.reduce((acc, cur) => {
    const type = getTypeByOrder(cur);

    if (!cur.count && acc[type][cur.price] !== undefined) {
      return {
        ...acc,
        [type]: {
          ...omit(acc[type] || {}, cur.price),
        },
      };
    }

    const orderWithAmountForAnyType: OrderT = {
      ...cur,
      amount: Math.abs(cur.amount),
    };

    return {
      ...acc,
      [type]: {
        ...(acc[type] || {}),
        [orderWithAmountForAnyType.price]: orderWithAmountForAnyType,
      },
    };
  }, bookToProcess);
};
