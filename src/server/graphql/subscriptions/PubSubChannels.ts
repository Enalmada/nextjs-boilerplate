import { type NotificationEvent } from '@/server/graphql/subscriptions/notification';

export type PubSubChannels = {
  NOTIFICATION_EVENT: [NotificationEvent];
};
