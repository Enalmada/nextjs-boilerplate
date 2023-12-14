'use client';

import { type NotificationEvent } from '@/client/gql/generated/graphql';
import { NOTIFICATION_EVENTS } from '@/client/gql/queries-mutations';
import { useSubscription } from '@enalmada/next-gql/client';

// https://formidable.com/open-source/urql/docs/advanced/subscriptions/

const handleSubscription = (
  messages: NotificationEvent[] = [],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  response: { notificationEvents: any }
) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return [response.notificationEvents, ...messages];
};

const Subscription = () => {
  const [result] = useSubscription({ query: NOTIFICATION_EVENTS }, handleSubscription);

  if (!result.data) {
    return <p>No new messages</p>;
  }

  return (
    <>
      {result.data.map((event: NotificationEvent) => (
        <ul key={event.id}>
          <p>
            {event.type}: &quot{event.message}&quot
          </p>
        </ul>
      ))}
    </>
  );
};

export default Subscription;
