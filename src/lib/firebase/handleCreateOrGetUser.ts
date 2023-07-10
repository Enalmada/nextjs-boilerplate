import { type NextRequest } from 'next/server';
import { authConfig } from '@/lib/firebase/config/server-config';
import UserService from '@/server/user/user.service';
import { getTokens } from 'next-firebase-auth-edge/lib/next/tokens';

export async function handleCreateOrGetUser(req: NextRequest) {
  const tokens = await getTokens(req.cookies, authConfig);
  const { uid: firebaseId, email } = tokens?.decodedToken ?? {};
  return firebaseId ? await UserService.createOrGetFirebaseUser(firebaseId, email) : null;
}
