/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import { builder } from '@/server/graphql/builder';
import { type MyContextType } from '@/server/graphql/server';
import { withFilter } from 'graphql-subscriptions';

import { pubsub } from './pubsub';

builder.subscriptionType({});

export const NotificationEventLabel = 'NOTIFICATION_EVENT';

export enum NotificationEventType {
  SystemNotification = 'SystemNotification',
}

builder.enumType(NotificationEventType, {
  name: 'NotificationEventType',
});

interface NotificationEvent {
  type: NotificationEventType;
  message: string;
}

export const NotificationEventRef = builder.objectRef<NotificationEvent>('NotificationEvent');

builder.objectType(NotificationEventRef, {
  name: 'NotificationEvent',
  description: 'When a notification is posted',
  fields: (t) => ({
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
    subscribe: (_, {}, ctx: MyContextType, _info: any) => {
      const subscriptionResolver = generateNotificationEventSubscriptionResolver({ ctx });
      return subscriptionResolver(_, {}, ctx, _info) as any as AsyncIterable<unknown>;
    },
    resolve: (payload, {}, context) => {
      return payload as NotificationEvent;
    },
  });
});

function generateNotificationEventSubscriptionResolver({ ctx }: { ctx: MyContextType }) {
  return withFilter(
    () => {
      return pubsub.asyncIterator(NotificationEventLabel);
    },
    (event: NotificationEvent, {}, ctx: MyContextType) => {
      // Send to all connected users to this subscription
      return true;
    }
  );
}

export async function publishNotificationEvent(event: NotificationEvent, context: MyContextType) {
  //await context.pubsub.publish(NotificationEventLabel, event);
  await pubsub.publish(NotificationEventLabel, event);
}

/*
builder.subscriptionField('clearCache', (t) =>
    t.field({
        type: UserType,
        nullable: true,
        resolve: (root, args, ctx) => {
            return new UserService().me(ctx);
        },
    })
);

 */

/*
// Define a subscription field
builder.subscriptionType({
    fields: (t) => ({
        clearCache: t.string({
            subscribe: (parent, args, context, info) => {
                // Implement your subscription logic here
                // For example, you might use an event emitter or a messaging system
                return asyncIterator; // This should be an AsyncIterator over your subscription events
            },
            resolve: (payload) => {
                // payload is what your AsyncIterator yields
                return payload;
            },
        }),
    }),
});

 */
