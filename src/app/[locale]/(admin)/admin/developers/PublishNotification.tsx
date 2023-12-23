'use client';

import { PUBLISH_NOTIFICATION } from '@/client/gql/admin-queries.gql';
import { type PublishNotificationMutation } from '@/client/gql/generated/graphql';
import { useMutation } from '@enalmada/next-gql/client';
import { Button, Spinner } from '@nextui-org/react';

const PublishNotification = () => {
  const [result, publishNotification] =
    useMutation<PublishNotificationMutation>(PUBLISH_NOTIFICATION);
  const { data, fetching, error } = result;

  return (
    <div>
      <div className={'mb-3 mt-10'}>Notification Publish</div>

      {fetching && (
        <>
          <Spinner /> <p>Loading...</p>
        </>
      )}

      {error && <p>Oh no... {error.message}</p>}

      <Button onPress={() => void publishNotification({ input: { message: 'published message' } })}>
        Publish
      </Button>

      {data && data.publishNotification && (
        <p className={'mt-3'}>
          Notification published: {data.publishNotification.published === true ? 'true' : 'false'}
        </p>
      )}
    </div>
  );
};

export default PublishNotification;
