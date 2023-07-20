import * as React from 'react';
import Link from 'next/link';
import { type State } from '@/client/components/layout/Header';
import { useAuth } from '@/lib/firebase/auth/context';

interface Props {
  headerStyle: State;
}

export default function AuthButtons(props: Props) {
  const { user } = useAuth();

  return (
    <>
      {user ? (
        <SignOut headerStyle={props.headerStyle} />
      ) : (
        <SignIn headerStyle={props.headerStyle} />
      )}
    </>
  );
}

function SignOut(props: Props) {
  return (
    <Link href={'/logout'}>
      <button
        className={`mx-auto mt-4 rounded-full bg-white px-8 py-4 font-bold opacity-75 shadow hover:underline lg:mx-0 lg:mt-0 ${props.headerStyle.navaction}`}
      >
        Logout
      </button>
    </Link>
  );
}

function SignIn(props: Props) {
  return (
    <Link href={'/login'}>
      <button
        className={`mx-auto mt-4 rounded-full bg-white px-8 py-4 font-bold opacity-75 shadow hover:underline lg:mx-0 lg:mt-0 ${props.headerStyle.navaction}`}
      >
        Login
      </button>
    </Link>
  );
}
