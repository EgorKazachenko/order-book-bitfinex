type InfoEventTypeT = 'subscribed' | 'info' | 'error' | 'unsubscribed';

export type InfoEventPayloadT<EventType = InfoEventTypeT> = {
  event: InfoEventTypeT;
  chanId: EventType extends 'subscribed' ? number : undefined;
};

export type DataEventT<T> = [number, T];

export type RawOrderRecordT = [number, number, number];

export type RecordEventPayloadT = DataEventT<RawOrderRecordT | RawOrderRecordT[]>;

/*
  "hb", "cs" etc.
  Should be ignored
 */
type CustomEventPayloadT = DataEventT<string>;

export type EventPayloadT = RecordEventPayloadT | InfoEventPayloadT | CustomEventPayloadT;

export type DataSourceSubscription = (p: EventPayloadT) => void;

export type WSThrottleT = 100 | 5000;
