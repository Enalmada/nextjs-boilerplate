/* eslint-disable react-hooks/rules-of-hooks */
import { baseURL } from '@/metadata.config';
import { type User } from '@/server/db/schema';
import { handleCreateOrGetUser } from '@/server/graphql/handleCreateOrGetUser';
import { privateSchema, publicSchema } from '@/server/graphql/schema';
import { type PubSubChannels } from '@/server/graphql/subscriptions/PubSubChannels';
import { makeServer, type PubSub } from '@enalmada/next-gql/server';
import { Logger } from 'next-axiom';

// export interface MyContextType extends YogaContext<User, PubSubChannels> {}

export interface MyContextType {
  currentUser?: User;
  pubSub: PubSub<PubSubChannels>;
}

function logError(message: string) {
  const log = new Logger();
  log.error(message);
  // TODO await seems to cause trouble for yoga
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
  log.flush().catch((e) => {
    console.error('Error while flushing log:', e);
  });
}

export function graphqlServer(graphqlEndpoint: string) {
  return makeServer<User, PubSubChannels>({
    schema: graphqlEndpoint === '/api/graphql' ? publicSchema : privateSchema,
    graphqlEndpoint,
    cors: {
      origin: baseURL,
    },
    handleCreateOrGetUser,
    logError,
  });
}
