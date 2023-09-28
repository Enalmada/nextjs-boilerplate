// https://github.com/JoviDeCroock/urql/blob/next-13-package/examples/with-next/app/non-rsc/layout.tsx
'use client';

import { useMemo, type ReactNode } from 'react';
// import { persistedExchange } from '@urql/exchange-persisted';
import cacheExchange from '@/client/gql/cacheExchange';
import { useAuth } from '@/lib/firebase/auth/context';
import { createClient, fetchExchange, ssrExchange, UrqlProvider } from '@urql/next';

interface Props {
  children: ReactNode;
}

// you need to create a component to wrap your app in
export function UrqlWrapper({ children }: Props) {
  // Client is unique to tenant
  // https://formidable.com/open-source/urql/docs/advanced/authentication/#cache-invalidation-on-logout
  // https://github.com/urql-graphql/urql/issues/297

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { user } = useAuth();
  const userIdToken = user?.idToken;

  const [client, ssr] = useMemo(() => {
    if (process.env.APP_ENV === 'local') {
      // eslint-disable-next-line no-console
      console.log('UrqlWrapper rendering' + Math.random());
    }
    const ssr = ssrExchange();

    const client = createClient({
      url: process.env.NEXT_PUBLIC_REDIRECT_URL + '/api/graphql',
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
          headers: { authorization: `${userIdToken || ''}` },
        };
      },
      requestPolicy: 'cache-first',
    });

    return [client, ssr];
  }, [userIdToken]);

  return (
    <UrqlProvider client={client} ssr={ssr}>
      {children}
    </UrqlProvider>
  );
}
