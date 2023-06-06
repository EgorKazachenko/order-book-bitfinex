import { OrderTypeT } from '../types';
import { Record } from '../components/book/Record';

export const HUMBLE_COLOR_BY_ORDER_TYPE: Record<OrderTypeT, string> = {
  bid: 'rgb(26, 69, 75)',
  ask: 'rgb(66, 51, 64)',
};

export const EXTRA_COLOR_BY_ORDER_TYPE: Record<OrderTypeT, string> = {
  bid: 'rgb(26, 99, 75)',
  ask: 'rgb(96, 51, 64)',
};
