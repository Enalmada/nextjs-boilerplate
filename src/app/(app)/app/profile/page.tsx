import { type Metadata } from 'next';
import { cookies } from 'next/headers';
import { ProfileWrapper } from '@/app/(app)/app/profile/UserProfile/UserProfile';
import { authConfig } from '@/lib/firebase/config/server-config';
import { getTokens } from 'next-firebase-auth-edge/lib/next/tokens';

// Generate customized metadata based on user cookies
// https://nextjs.org/docs/app/building-your-application/optimizing/metadata
export async function generateMetadata(): Promise<Metadata> {
  const tokens = await getTokens(cookies(), authConfig);

  if (!tokens) {
    return {};
  }

  return {
    title: `${tokens.decodedToken.email} Profile`,
  };
}

export default function Profile() {
  return <ProfileWrapper />;
}
