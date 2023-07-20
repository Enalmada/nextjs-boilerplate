'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/client/ui/Button';
import { LoadingIcon } from '@/client/ui/icons';
import { MainTitle } from '@/client/ui/MainTitle';
import { PasswordForm } from '@/client/ui/PasswordForm';
import { type PasswordFormValue } from '@/client/ui/PasswordForm/PasswordForm';
import { useFirebaseAuth } from '@/lib/firebase/auth/firebase';
import { FirebaseError } from '@firebase/util';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { useLoadingCallback } from 'react-loading-hook';

import styles from './register.module.css';

export function RegisterPage() {
  const router = useRouter();
  const params = useSearchParams();
  const [hasLogged, setHasLogged] = React.useState(false);
  // const { user } = useAuth();
  const { getFirebaseAuth } = useFirebaseAuth();
  const redirect = params?.get('redirect');
  const [registerWithEmailAndPassword, isRegisterLoading, error] = useLoadingCallback(
    async ({ email, password }: PasswordFormValue) => {
      setHasLogged(false);
      const auth = getFirebaseAuth();

      try {
        const credential = await createUserWithEmailAndPassword(auth, email, password);
        await sendEmailVerification(credential.user);
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
      } catch (error) {
        if (error instanceof FirebaseError && error.code === 'auth/email-already-in-use') {
          throw new Error('This email is already in use');
        }

        throw error;
      }
    }
  ) as [(arg0: PasswordFormValue) => Promise<void>, boolean, { message: string }, unknown];

  function getLoginUrl() {
    if (redirect) {
      return `/login?redirect=${redirect}`;
    }

    return '/login';
  }

  return (
    <div className={styles.page}>
      <MainTitle>Register</MainTitle>
      {hasLogged && (
        <div className={styles.info}>
          <span>
            Redirecting to <strong>{params?.get('redirect') || '/'}</strong>
          </span>
          <LoadingIcon />
        </div>
      )}
      {!hasLogged && (
        <PasswordForm
          onSubmit={({ email, password }) =>
            void registerWithEmailAndPassword({ email, password }).catch(() => {})
          }
          loading={isRegisterLoading}
          error={error}
        >
          <Link href={getLoginUrl()}>
            <Button disabled={isRegisterLoading}>Back to login</Button>
          </Link>
        </PasswordForm>
      )}
    </div>
  );
}
