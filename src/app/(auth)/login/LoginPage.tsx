'use client';

import React, { useState } from 'react';
import GoogleButton from '@/client/components/auth/GoogleButton';
import PasswordForm from '@/client/components/auth/PasswordForm';
import Redirecting from '@/client/components/auth/Redirecting';
import { Link } from '@/client/ui';

interface Props {
  redirect?: string;
}

export function LoginPage({ redirect }: Props) {
  const [hasLogged, setHasLogged] = useState(false);

  return (
    <>
      {hasLogged && (
        <Redirecting>
          Redirecting to <strong>{redirect || '/'}</strong>
        </Redirecting>
      )}
      {!hasLogged && (
        <>
          <div className="text-center">
            <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">Sign in</h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Don&apos;t have an account yet?&nbsp;&nbsp;
              <Link size="sm" href={`/register` + (redirect ? `?redirect=${redirect}` : '')}>
                Sign up here
              </Link>
            </p>
          </div>

          <div className="mt-5">
            <GoogleButton redirect={redirect} setHasLogged={setHasLogged}>
              Sign in with Google
            </GoogleButton>

            <div className="flex items-center py-3 text-xs uppercase text-gray-400 before:mr-6 before:flex-[1_1_0%] before:border-t before:border-gray-200 after:ml-6 after:flex-[1_1_0%] after:border-t after:border-gray-200 dark:text-gray-500 dark:before:border-gray-600 dark:after:border-gray-600">
              Or
            </div>

            <PasswordForm redirect={redirect} isSignIn={true} setHasLogged={setHasLogged} />
          </div>
        </>
      )}
    </>
  );
}
