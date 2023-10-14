import { type NextRequest } from 'next/server';
import { authConfig } from '@/lib/firebase/config/server-config';
import { type User } from '@/server/db/schema';
import UserService from '@/server/user/user.service';
import { getFirebaseAuth } from 'next-firebase-auth-edge/lib/auth';
import { getTokens } from 'next-firebase-auth-edge/lib/next/tokens';

export async function handleCreateOrGetUser(req: Request): Promise<User | null> {
  let firebaseId: string | undefined = undefined;
  let email: string | undefined = undefined;

  // Cookie used during normal processing
  const tokenCookie = await getTokens((req as NextRequest).cookies, authConfig);
  if (tokenCookie?.decodedToken) {
    firebaseId = tokenCookie.decodedToken.uid;
    email = tokenCookie.decodedToken.email;
  }

  // headers used during SSR or layout transition
  if (!firebaseId) {
    const authorizationHeader = req.headers.get('authorization');
    if (authorizationHeader) {
      const { verifyIdToken } = getFirebaseAuth(
        {
          ...authConfig.serviceAccount,
        },
        authConfig.apiKey
      );

      const tokens = await verifyIdToken(authorizationHeader);

      if (tokens) {
        firebaseId = tokens.uid;
        email = tokens.email;
      }
    }
  }

  if (firebaseId) {
    return await UserService.createOrGetFirebaseUser(firebaseId, email);
  }

  return null;
}
