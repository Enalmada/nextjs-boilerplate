// https://github.com/JoviDeCroock/urql/blob/next-13-package/examples/with-next/app/non-rsc/layout.tsx
'use client';

import { useMemo, type ReactNode } from 'react';
import cacheExchange from '@/client/gql/cacheExchange';
import { authExchange, type AuthUtilities } from '@urql/exchange-auth';
import { persistedExchange } from '@urql/exchange-persisted';
import {
  createClient,
  fetchExchange,
  ssrExchange,
  UrqlProvider,
  type CombinedError,
  type Operation,
} from '@urql/next';

interface Props {
  isLoggedIn: boolean;
  cookie?: string | null;
  children: ReactNode;
}

export function UrqlWrapper({ isLoggedIn, cookie, children }: Props) {
  // Client is unique to tenant
  // https://formidable.com/open-source/urql/docs/advanced/authentication/#cache-invalidation-on-logout
  // https://github.com/urql-graphql/urql/issues/297

  const [client, ssr] = useMemo(() => {

    // Although no current operations are async, it is a required attribute
    // eslint-disable-next-line @typescript-eslint/require-await
    const auth = authExchange(async (utilities: AuthUtilities) => {
      return {
        addAuthToOperation(operation: Operation) {
          const isSSR = typeof window === 'undefined';

          if (!isSSR || !cookie) return operation;

          // Add cookies during SSR since they are not automatically passed along
          return utilities.appendHeaders(operation, {
            cookie,
          });
        },
        didAuthError(error: CombinedError) {
          // TODO review if this is ever triggered and how to respond
          return error.graphQLErrors.some((e) => e.extensions?.code === 'UNAUTHORIZED');
        },
        refreshAuth: async () => {}, // no-op but refreshAuth is required param
      };
    });

    const ssr = ssrExchange();

    const client = createClient({
      url: process.env.NEXT_PUBLIC_REDIRECT_URL + '/api/graphql',
      exchanges: [
        cacheExchange,
        auth,
        ssr,
        persistedExchange({
          enforcePersistedQueries: false,
          preferGetForPersistedQueries: false,
          enableForMutation: true,
        }),
        fetchExchange,
      ],
      suspense: true,
      requestPolicy: 'cache-first',
      fetchOptions: {
        headers: {
          // https://the-guild.dev/graphql/yoga-server/docs/features/csrf-prevention
          'x-graphql-csrf': 'true',
        },
      },
    });

    return [client, ssr];

    // adding cookies will cause unnecessary rerender as it can change for same user
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

  return (
    <UrqlProvider client={client} ssr={ssr}>
      {children}
    </UrqlProvider>
  );
}
