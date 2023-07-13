'use client';

// ^ this file needs the "use client" pragma
import { env } from '@/env.mjs';
import { useAuth } from '@/lib/firebase/auth/hooks';
import { ApolloLink, HttpLink, SuspenseCache, type DefaultOptions } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import {
  ApolloNextAppProvider,
  NextSSRApolloClient,
  NextSSRInMemoryCache,
  SSRMultipartLink,
} from '@apollo/experimental-nextjs-app-support/ssr';

import typePolicies from './typePolicies';

// Graphql error policies overridden to return data and errors (default is data OR errors)
// This decision impacts the shape of the response so you need to decide up front
// to handle errors appropriately
// https://www.apollographql.com/docs/react/data/error-handling/#graphql-error-policies
const defaultOptions: DefaultOptions = {
  query: {
    fetchPolicy: 'cache-first',
    errorPolicy: 'all', // default "none"
    partialRefetch: true,
  },
  mutate: {
    errorPolicy: 'all', // default "none"
  },
};

// have a function to create a client for you
function makeClient(tenantIdToken: string | null) {
  const authLink = setContext((_, { headers }) => {
    return {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      headers: {
        ...headers,
        authorization: tenantIdToken ? `${tenantIdToken}` : '',
      },
    };
  });

  const httpLink = new HttpLink({
    // this needs to be an absolute url, as relative urls cannot be used in SSR
    uri: env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
    // you can disable result caching here if you want to
    // (this does not work if you are rendering your page with `export const dynamic = "force-static"`)
    fetchOptions: { cache: 'default' }, // default, no-store, reload, no-cache, force-cache, only-if-cached
  });

  return new NextSSRApolloClient({
    // use the `NextSSRInMemoryCache`, not the normal `InMemoryCache`
    defaultOptions: defaultOptions,
    cache: new NextSSRInMemoryCache({
      typePolicies: typePolicies,
    }),
    link:
      typeof window === 'undefined'
        ? ApolloLink.from([
            // in a SSR environment, if you use multipart features like
            // @defer, you need to decide how to handle these.
            // This strips all interfaces with a `@defer` directive from your queries.
            new SSRMultipartLink({
              stripDefer: true,
            }),
            authLink,
            httpLink,
          ])
        : authLink.concat(httpLink),
  });
}

// also have a function to create a suspense cache
function makeSuspenseCache() {
  return new SuspenseCache();
}

// you need to create a component to wrap your app in
export function ApolloWrapper({ children }: React.PropsWithChildren) {
  const { tenant } = useAuth();
  const tenantIdToken = tenant?.idToken ?? null;

  return (
    <ApolloNextAppProvider
      makeClient={() => makeClient(tenantIdToken)}
      makeSuspenseCache={makeSuspenseCache}
    >
      {children}
    </ApolloNextAppProvider>
  );
}
