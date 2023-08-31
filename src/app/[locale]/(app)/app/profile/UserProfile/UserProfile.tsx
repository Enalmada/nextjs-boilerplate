'use client';

import Image from 'next/image';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { Button, ButtonGroup, Card, CardBody } from '@/client/ui';
import { useLoadingCallback } from '@/client/utils/useLoadingCallback';
import { useAuth } from '@/lib/firebase/auth/context';
import { useFirebaseAuth } from '@/lib/firebase/auth/firebase';
import { clientConfig } from '@/lib/firebase/config/client-config';
import { Chip } from '@nextui-org/react';

interface UserProfileProps {
  count: number;
}

export function ProfileWrapper() {
  return (
    <div>
      <nav>
        <Button as={NextLink} href="/app">
          Back to App
        </Button>
      </nav>
      <h1>Profile page</h1>
      <UserProfile count={0} />
    </div>
  );
}

export function UserProfile({ count }: UserProfileProps) {
  const router = useRouter();
  const { user } = useAuth();
  const { getFirebaseAuth } = useFirebaseAuth();

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

  if (!user) {
    return null;
  }

  return (
    <>
      <Card>
        <CardBody>
          <h3>You are logged in as</h3>
          <div>
            <div>
              {user.photoURL && <Image alt="" height="100" width="100" src={user.photoURL} />}
            </div>
            <span>{user.email}</span>
          </div>

          {!user.emailVerified && (
            <div>
              <Chip>Email not verified.</Chip>
            </div>
          )}
          {user.emailVerified && (
            <div>
              <Chip>Email verified.</Chip>
            </div>
          )}

          <div>
            <h5>Custom claims</h5>
            <pre>{JSON.stringify(user.customClaims, undefined, 2)}</pre>
          </div>
          <ButtonGroup>
            <Button
              isLoading={isClaimsLoading}
              disabled={isClaimsLoading}
              onPress={() => void handleClaims()}
            >
              Refresh custom user claims
            </Button>
            <Button onPress={handleRedirect}>Redirect</Button>
          </ButtonGroup>
        </CardBody>
      </Card>

      <Card>
        <CardBody>
          <h3>
            {/* defaultCount is updated by server */}
            Counter: {count}
          </h3>
        </CardBody>
      </Card>
    </>
  );
}
