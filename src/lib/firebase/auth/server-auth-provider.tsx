import { cookies } from 'next/headers';
import { type Tokens } from 'next-firebase-auth-edge/lib/auth';
import { filterStandardClaims } from 'next-firebase-auth-edge/lib/auth/tenant';
import { getTokens } from 'next-firebase-auth-edge/lib/next/tokens';

import { authConfig } from '../config/server-config';
import { AuthProvider } from './client-auth-provider';
import { type User } from './context';

const mapTokensToUser = (tokens: Tokens): User => {
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

export async function ServerAuthProvider({ children }: { children: React.ReactNode }) {
  const tokens = await getTokens(cookies(), authConfig);
  const user = tokens ? mapTokensToUser(tokens) : null;

  return <AuthProvider defaultUser={user}>{children}</AuthProvider>;
}
