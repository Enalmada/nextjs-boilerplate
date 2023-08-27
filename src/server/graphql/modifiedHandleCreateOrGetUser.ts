import { type NextRequest } from 'next/server';
import { authConfig } from '@/lib/firebase/config/server-config';
import { type User } from '@/server/db/schema';
import UserService from '@/server/user/user.service';
import { getFirebaseAuth } from 'next-firebase-auth-edge/lib/auth';

export async function modifiedHandleCreateOrGetUser(req: NextRequest): Promise<User | null> {
  const authorization = req.headers.get('authorization');

  if (!authorization) {
    return null;
  }

  const { verifyIdToken } = getFirebaseAuth(
    {
      ...authConfig.serviceAccount,
    },
    authConfig.apiKey
  );

  const tokens = await verifyIdToken(authorization);

  const { uid: firebaseId, email } = tokens ?? {};
  return firebaseId ? await UserService.createOrGetFirebaseUser(firebaseId, email) : null;
}
