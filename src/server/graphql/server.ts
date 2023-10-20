/* eslint-disable react-hooks/rules-of-hooks */
import { baseURL } from '@/metadata.config';
import { type User } from '@/server/db/schema';
import { handleCreateOrGetUser } from '@/server/graphql/handleCreateOrGetUser';
import { schema } from '@/server/graphql/schema';
import { makeServer } from '@enalmada/next-gql/server';
import { Logger } from 'next-axiom';

export interface MyContextType {
  currentUser: User;
}

function logError(message: string) {
  const log = new Logger();
  log.error(message);
  // TODO await seems to cause trouble for yoga
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  log.flush();
}

export function graphqlServer(graphqlEndpoint: string) {
  return makeServer<User>({
    schema,
    graphqlEndpoint,
    cors: {
      origin: baseURL,
    },
    handleCreateOrGetUser,
    logError,
  });
}
