/* eslint-disable @typescript-eslint/no-unused-vars */
import { builder } from '@/server/graphql/builder';
import { type MyContextType } from '@/server/graphql/server';

export const NotificationEventLabel = 'NOTIFICATION_EVENT';

export enum NotificationEventType {
  SystemNotification = 'SystemNotification',
}

builder.enumType(NotificationEventType, {
  name: 'NotificationEventType',
});

export interface NotificationEvent {
  id: string;
  type: NotificationEventType;
  message: string;
}

export const NotificationEventRef = builder.objectRef<NotificationEvent>('NotificationEvent');

builder.objectType(NotificationEventRef, {
  name: 'NotificationEvent',
  description: 'When a notification is posted',
  fields: (t) => ({
    id: t.exposeID('id'),
    type: t.field({
      type: NotificationEventType,
      description: 'Notification type',
      resolve: (event) => {
        return event.type;
      },
    }),
    message: t.exposeString('message', {
      description: 'Notification message',
    }),
  }),
});
builder.subscriptionField('notificationEvents', (t) => {
  return t.field({
    type: NotificationEventRef,
    description: 'Events related to notifications',
    args: {},
    subscribe: (parent, args, ctx, info) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-return
      return ctx.pubSub.subscribe(NotificationEventLabel);
    },
    resolve: (payload) => {
      return payload;
    },
  });
});

export function publishNotificationEvent(event: NotificationEvent, ctx: MyContextType) {
  ctx.pubSub.publish(NotificationEventLabel, event);
}
