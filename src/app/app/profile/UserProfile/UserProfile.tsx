'use client';

import * as React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from '@/client/ui/button';
import { useAuth } from '@/lib/firebase/auth/hooks';
import { clientConfig } from '@/lib/firebase/config/client-config';
import { useLoadingCallback } from 'react-loading-hook';

import styles from './UserProfile.module.css';

export function UserProfile() {
  const router = useRouter();
  const { tenant } = useAuth();

  const [handleRefresh, isRefreshLoading] = useLoadingCallback(async () => {
    if (!tenant) {
      return;
    }

    await fetch('/api/refresh-tokens', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${tenant.idToken}`,
      },
    });
  });

  const [handleClaims, isClaimsLoading] = useLoadingCallback(async () => {
    if (!tenant) {
      return;
    }

    await fetch('/api/custom-claims', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${tenant.idToken}`,
      },
    });
  });

  function handleRedirect() {
    router.push(`${clientConfig.redirectUrl}?redirect_url=${window.location.href}`);
  }

  if (!tenant) {
    return null;
  }

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>You are logged in as</h3>
      <div className={styles.content}>
        <div className={styles.avatar}>
          {tenant.photoUrl && (
            <Image
              src={tenant.photoUrl}
              alt={''}
              style={{ objectFit: 'contain' }}
              width={100}
              height={100}
            />
          )}
        </div>
        <span>{tenant.email}</span>
      </div>
      <div className={styles.buttonGroup}>
        <Button
          loading={isClaimsLoading}
          disabled={isClaimsLoading}
          onClick={() => void handleClaims()}
        >
          Set custom user claims
        </Button>
        <Button
          loading={isRefreshLoading}
          disabled={isRefreshLoading}
          onClick={() => void handleRefresh()}
        >
          Refresh tokens
        </Button>

        <Button onClick={() => void handleRedirect()}>Redirect</Button>
      </div>
    </div>
  );
}
