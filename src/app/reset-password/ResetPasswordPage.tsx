'use client';

import * as React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/client/ui/Button';
import { FormError } from '@/client/ui/FormError';
import { Input } from '@/client/ui/Input';
import { MainTitle } from '@/client/ui/MainTitle';
import { useFirebaseAuth } from '@/lib/firebase/auth/firebase';
import { sendPasswordResetEmail } from 'firebase/auth';
import { useLoadingCallback } from 'react-loading-hook';

import styles from './ResetPasswordPage.module.css';

export function ResetPasswordPage() {
  const params = useSearchParams();
  const [email, setEmail] = React.useState('');
  const [isSent, setIsSent] = React.useState(false);
  const { getFirebaseAuth } = useFirebaseAuth();
  const redirect = params?.get('redirect');
  const [sendResetInstructions, loading, error] = useLoadingCallback(
    async (event: React.FormEvent) => {
      event.preventDefault();
      event.stopPropagation();

      const auth = getFirebaseAuth();
      setIsSent(false);
      await sendPasswordResetEmail(auth, email);
      setEmail('');
      setIsSent(true);
    }
  ) as [(arg0: React.FormEvent) => Promise<void>, boolean, { message: string }, unknown];

  function getLoginUrl() {
    if (redirect) {
      return `/login?redirect=${redirect}`;
    }

    return '/login';
  }

  return (
    <div className={styles.page}>
      <MainTitle>Reset password</MainTitle>
      <form onSubmit={(e) => void sendResetInstructions(e)} className={styles.form}>
        <Input
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          name="email"
          type="email"
          placeholder="Email address"
        />
        {isSent && <p className={styles.info}>Instructions sent. Check your email.</p>}
        {error && <FormError>{error?.message}</FormError>}
        <Button loading={loading} disabled={loading} variant="contained" type="submit">
          Send reset instructions
        </Button>
        <Link href={getLoginUrl()}>
          <Button disabled={loading}>Back to login</Button>
        </Link>
      </form>
    </div>
  );
}
