export type OrderT = {
  price: number;
  count: number;
  amount: number;
};

export type OrderTypeT = 'bid' | 'ask';

export type OrdersBookPartT = Record<number, OrderT>;

export type OrdersBookT = Record<OrderTypeT, OrdersBookPartT>;
