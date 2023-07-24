'use client';

import * as React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Badge } from '@/client/ui/Badge';
import { Button } from '@/client/ui/Button';
import { ButtonGroup } from '@/client/ui/ButtonGroup';
import { Card } from '@/client/ui/Card';
import { LoadingIcon } from '@/client/ui/icons';
import { useAuth } from '@/lib/firebase/auth/context';
import { useFirebaseAuth } from '@/lib/firebase/auth/firebase';
import { clientConfig } from '@/lib/firebase/config/client-config';
import { signOut } from 'firebase/auth';
import { useLoadingCallback } from 'react-loading-hook';

import styles from './UserProfile.module.css';

interface UserProfileProps {
  count: number;
}

export function UserProfile({ count }: UserProfileProps) {
  const router = useRouter();
  const { user } = useAuth();
  const { getFirebaseAuth } = useFirebaseAuth();
  const [hasLoggedOut, setHasLoggedOut] = React.useState(false);
  const [handleLogout, isLogoutLoading] = useLoadingCallback(async () => {
    const auth = getFirebaseAuth();
    await signOut(auth);
    setHasLoggedOut(true);
    await fetch('/api/logout', {
      method: 'GET',
    });
    window.location.reload();
  });

  const [handleClaims, isClaimsLoading] = useLoadingCallback(async () => {
    const auth = getFirebaseAuth();
    await fetch('/api/custom-claims', {
      method: 'POST',
    });

    await auth.currentUser!.getIdTokenResult(true);
  });

  function handleRedirect() {
    router.push(`${clientConfig.redirectUrl}?redirect_url=${window.location.href}`);
  }

  if (!user && hasLoggedOut) {
    return (
      <div className={styles.container}>
        <div className={styles.section}>
          <h3 className={styles.title}>
            <span>You are being logged out...</span>
            <LoadingIcon />
          </h3>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className={styles.container}>
      <Card className={styles.section}>
        <h3 className={styles.title}>You are logged in as</h3>
        <div className={styles.content}>
          <div className={styles.avatar}>
            {user.photoURL && <Image alt="" height="100" width="100" src={user.photoURL} />}
          </div>
          <span>{user.email}</span>
        </div>

        {!user.emailVerified && (
          <div className={styles.content}>
            <Badge>Email not verified.</Badge>
          </div>
        )}

        <ButtonGroup>
          <div className={styles.claims}>
            <h5>Custom claims</h5>
            <pre>{JSON.stringify(user.customClaims, undefined, 2)}</pre>
          </div>
          <Button
            isLoading={isClaimsLoading}
            disabled={isClaimsLoading}
            onPress={() => void handleClaims()}
          >
            Refresh custom user claims
          </Button>
          <Button
            isLoading={isLogoutLoading}
            disabled={isLogoutLoading}
            onPress={() => void handleLogout()}
          >
            Log out
          </Button>
          <Button onPress={handleRedirect}>Redirect</Button>
        </ButtonGroup>
      </Card>
      <Card className={styles.section}>
        <h3 className={styles.title}>
          {/* defaultCount is updated by server */}
          Counter: {count}
        </h3>
      </Card>
    </div>
  );
}
