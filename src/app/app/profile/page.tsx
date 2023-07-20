import { type Metadata } from 'next';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { Button } from '@/client/ui/Button';
import { ServerAuthProvider } from '@/lib/firebase/auth/server-auth-provider';
import { authConfig } from '@/lib/firebase/config/server-config';
import { getTokens } from 'next-firebase-auth-edge/lib/next/tokens';

import styles from './page.module.css';
import { UserProfile } from './UserProfile';

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
  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        <Link href="/app">
          <Button>Back to App</Button>
        </Link>
      </nav>
      <h1 className={styles.title}>Profile page</h1>
      <ServerAuthProvider>
        <UserProfile count={0} />
      </ServerAuthProvider>
    </div>
  );
}
