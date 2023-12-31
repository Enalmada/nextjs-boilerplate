import React from 'react';
import { cookies } from 'next/headers';
import { cacheExchange } from '@/client/gql/cacheExchange';
import { baseURL } from '@/metadata.config';
import { UrqlWrapper as NextGqlProvider } from '@enalmada/next-gql/client/urql/UrqlWrapper';
import { type Tokens } from 'next-firebase-auth-edge/lib/auth';
import { filterStandardClaims } from 'next-firebase-auth-edge/lib/auth/claims';
import { getTokens } from 'next-firebase-auth-edge/lib/next/tokens';

import { authConfig } from '../config/server-config';
import { AuthProvider } from './client-auth-provider';
import { type User } from './context';

export const mapTokensToUser = (tokens: Tokens): User => {
  const {
    uid,
    email,
    picture: photoURL,
    email_verified: emailVerified,
    phone_number: phoneNumber,
    name: displayName,
  } = tokens.decodedToken;

  const customClaims = filterStandardClaims(tokens.decodedToken);

  return {
    uid,
    email: email ?? null,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    displayName: displayName ?? null,
    photoURL: photoURL ?? null,
    phoneNumber: phoneNumber ?? null,
    emailVerified: emailVerified ?? false,
    customClaims,
    idToken: tokens.token,
  };
};

// I would prefer AuthProvider and UrqlWrapper separate but I would need to create
// a ServerUrqlWrapper that immediately fetches the same data (tokens and cookies).
// feels like a waste so combining for now.
export async function ServerAuthProvider({
  nonce,
  children,
}: {
  nonce?: string;
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const tokens = await getTokens(cookieStore, authConfig);
  const user = tokens ? mapTokensToUser(tokens) : null;
  const url = `${baseURL}/api/graphql`;

  return (
    <AuthProvider defaultUser={user}>
      <NextGqlProvider
        url={url}
        isLoggedIn={!tokens}
        cookie={JSON.stringify(cookieStore)}
        cacheExchange={cacheExchange}
        nonce={nonce}
      >
        {children}
      </NextGqlProvider>
    </AuthProvider>
  );
}
