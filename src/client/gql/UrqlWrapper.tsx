// https://github.com/JoviDeCroock/urql/blob/next-13-package/examples/with-next/app/non-rsc/layout.tsx
'use client';

import { useMemo, type ReactNode } from 'react';
// import { persistedExchange } from '@urql/exchange-persisted';
import cacheExchange from '@/client/gql/cacheExchange';
import { type CombinedError, createClient, fetchExchange, type Operation, ssrExchange, UrqlProvider } from '@urql/next';
import { authExchange, type AuthUtilities } from '@urql/exchange-auth';

interface Props {
  cookie?: string | null;
  children: ReactNode;
}

export function UrqlWrapper({ cookie, children }: Props) {
  // Client is unique to tenant
  // https://formidable.com/open-source/urql/docs/advanced/authentication/#cache-invalidation-on-logout
  // https://github.com/urql-graphql/urql/issues/297

  const [client, ssr] = useMemo(() => {
    if (process.env.NODE_ENV == 'development') {
      // If you miss a suspense boundary then urql will infinite loop.
      // Watching for it is currently the best way to catch it.
      // eslint-disable-next-line no-console
      console.log('UrqlWrapper initializing');
    }

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
          return error.graphQLErrors.some((e) => e.extensions?.code === 'UNAUTHORIZED');
        },
        refreshAuth: async () => {},
      };
    });

    const ssr = ssrExchange();

    const client = createClient({
      url: process.env.NEXT_PUBLIC_REDIRECT_URL + '/api/graphql',
      exchanges: [
        cacheExchange,
        auth,
        ssr,
        /*
 persistedExchange({
   preferGetForPersistedQueries: false,
 }),
    */
        fetchExchange,
      ],
      suspense: true,
      requestPolicy: 'cache-first',
      fetchOptions: {
        headers: {
          // https://the-guild.dev/graphql/yoga-server/docs/features/csrf-prevention
          'x-graphql-csrf': 'true'
        },
      },
    });

    return [client, ssr];

    // adding cookies will cause unnecessary rerender as it can change for same user
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <UrqlProvider client={client} ssr={ssr}>
      {children}
    </UrqlProvider>
  );
}