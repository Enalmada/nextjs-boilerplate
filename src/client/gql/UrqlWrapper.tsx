// https://github.com/JoviDeCroock/urql/blob/next-13-package/examples/with-next/app/non-rsc/layout.tsx
'use client';

import { useMemo } from 'react';
// import { persistedExchange } from '@urql/exchange-persisted';
import cacheExchange from '@/client/gql/cacheExchange';
import { env } from '@/env.mjs';
import { useAuth } from '@/lib/firebase/auth/hooks';
import { createClient, fetchExchange, ssrExchange, UrqlProvider } from '@urql/next';

const ssr = ssrExchange();

// you need to create a component to wrap your app in
export function UrqlWrapper({ children }: React.PropsWithChildren) {
  // Client is unique to tenant
  // https://formidable.com/open-source/urql/docs/advanced/authentication/#cache-invalidation-on-logout
  // https://github.com/urql-graphql/urql/issues/297

  const { tenant } = useAuth();
  const tenantIdToken = tenant?.idToken ?? null;

  const client = useMemo(() => {
    return createClient({
      url: env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
      exchanges: [
        cacheExchange,
        ssr,
        /*
        persistedExchange({
          preferGetForPersistedQueries: false,
        }),
           */
        fetchExchange,
      ],
      suspense: true,
      fetchOptions: () => {
        return {
          // avoid running into cached fetches with server-components
          cache: 'no-store',
          // authorization header must always be passed for csrf prevention
          // https://the-guild.dev/graphql/yoga-server/docs/features/csrf-prevention
          headers: { authorization: `${tenantIdToken || ''}` } };
      },
      requestPolicy: 'cache-first',
    });
  }, [tenantIdToken]);

  return (
    <UrqlProvider client={client} ssr={ssr}>
      {children}
    </UrqlProvider>
  );
}
