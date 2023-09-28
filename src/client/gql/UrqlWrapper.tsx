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

export function UrqlWrapper({ children }: Props) {
  // Client is unique to tenant
  // https://formidable.com/open-source/urql/docs/advanced/authentication/#cache-invalidation-on-logout
  // https://github.com/urql-graphql/urql/issues/297

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { user } = useAuth();
  const userIdToken = user?.idToken;

  const [client, ssr] = useMemo(() => {
    const isSSR = typeof window === 'undefined';
    if (process.env.NODE_ENV == 'development') {
      // If you miss a suspense boundary then urql will infinite loop.
      // Watching for it is currently the best way to catch it.
      // eslint-disable-next-line no-console
      console.log('UrqlWrapper initializing')
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
          headers: isSSR ? { authorization: `${userIdToken || ''}` } : undefined,
        };
      },
      requestPolicy: 'cache-first',
    });

    return [client, ssr];
    // userIdToken is only added server so it doesn't need to be a memo dep
    // adding it will cause list tasks to be re rendered client side
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <UrqlProvider client={client} ssr={ssr}>
      {children}
    </UrqlProvider>
  );
}
