'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/client/ui/Button';
import { ButtonGroup } from '@/client/ui/ButtonGroup';
import { LoadingIcon } from '@/client/ui/icons';
import { MainTitle } from '@/client/ui/MainTitle';
import { PasswordForm } from '@/client/ui/PasswordForm';
import { type PasswordFormValue } from '@/client/ui/PasswordForm/PasswordForm';
import { useFirebaseAuth } from '@/lib/firebase/auth/firebase';
import { FirebaseError } from '@firebase/util';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useLoadingCallback } from 'react-loading-hook';

import { getGoogleProvider, loginWithProvider } from './firebase';
import styles from './login.module.css';

export function LoginPage() {
  const router = useRouter();
  const params = useSearchParams();
  const [hasLogged, setHasLogged] = React.useState(false);
  const { getFirebaseAuth } = useFirebaseAuth();
  const redirect = params?.get('redirect');
  type LoginFormFn = ({ email, password }: PasswordFormValue) => Promise<void>;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const [handleLoginWithEmailAndPassword, isEmailLoading, error] = useLoadingCallback<LoginFormFn>(
    async ({ email, password }: PasswordFormValue) => {
      setHasLogged(false);
      const auth = getFirebaseAuth();
      try {
        const credential = await signInWithEmailAndPassword(auth, email, password);
        const idTokenResult = await credential.user.getIdTokenResult();
        await fetch('/api/login', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${idTokenResult.token}`,
          },
        });
        setHasLogged(true);
        router.refresh(); // This seems necessary to avoid a full window.reload
        // TODO get router refresh and push working again.
        // router.push(redirect ?? '/');
        window.location.replace(redirect ?? '/');
      } catch (error: unknown) {
        if (error instanceof FirebaseError && error.code === 'auth/user-not-found') {
          throw new Error('The email/password combination not found');
        }

        throw error;
      }
    }
  ) as [(arg0: PasswordFormValue) => Promise<void>, boolean, { message: string }, unknown];

  /*
  const handleLoginWithGoogle = async () => {
    setHasLogged(false);
    const { GoogleAuthProvider } = await import('firebase/auth');
    const auth = await getFirebaseAuth();
    const tenant = await loginWithProvider(
      auth,
      await getGoogleProvider(auth),
      // eslint-disable-next-line @typescript-eslint/unbound-method
      GoogleAuthProvider.credentialFromError
    );
    await fetch('/api/login', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${tenant.idToken}`,
      },
    });
    setHasLogged(true);
    const redirect = params?.get('redirect');
    router.refresh(); // This seems necessary to avoid a full window.reload
    router.push(redirect ?? '/');
  };
   */

  const [handleLoginWithGoogle, isGoogleLoading] = useLoadingCallback(async () => {
    setHasLogged(false);
    const auth = getFirebaseAuth();
    const user = await loginWithProvider(auth, getGoogleProvider(auth));
    const idTokenResult = await user.getIdTokenResult();
    await fetch('/api/login', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${idTokenResult.token}`,
      },
    });
    setHasLogged(true);
    router.refresh(); // This seems necessary to avoid a full window.reload
    // TODO get router refresh and push working again.
    //router.push(redirect ?? '/');
    window.location.replace(redirect ?? '/');
  });

  function passRedirectParam(url: string) {
    if (redirect) {
      return `${url}?redirect=${redirect}`;
    }

    return url;
  }

  return (
    <div className={styles.page}>
      <MainTitle>Login</MainTitle>
      {hasLogged && (
        <div className={styles.info}>
          <span>
            Redirecting to <strong>{redirect || '/'}</strong>
          </span>
          <LoadingIcon />
        </div>
      )}
      {!hasLogged && (
        <PasswordForm
          loading={isEmailLoading}
          /* eslint-disable-next-line @typescript-eslint/no-misused-promises */
          onSubmit={({ email, password }) =>
            void handleLoginWithEmailAndPassword({ email, password }).catch(() => {})
          }
          error={error}
        >
          <ButtonGroup>
            <Link className={styles.link} href={passRedirectParam('/reset-password')}>
              Reset password
            </Link>
            <Link href={passRedirectParam('/register')}>
              <Button>Register</Button>
            </Link>
            <Button
              loading={isGoogleLoading}
              disabled={isGoogleLoading}
              onClick={() => void handleLoginWithGoogle()}
            >
              Log in with Google
            </Button>
          </ButtonGroup>
        </PasswordForm>
      )}
    </div>
  );
}
