import * as React from 'react';
import Link from 'next/link';
import { getRouteById } from '@/client/utils/routes';
import { useAuth } from '@/lib/firebase/auth/context';

export default function AuthButtons() {
  const { user } = useAuth();

  const active = false;
  return (
    <>
      {user ? (
        <Link
          href={'/app/profile'}
          className={`inline-block px-4 py-2 text-black no-underline ${
            active ? 'font-bold no-underline' : 'hover:text-underline hover:text-gray-800'
          }`}
        >
          Profile
        </Link>
      ) : (
        <Link
          href={getRouteById('About').path}
          className={`inline-block px-4 py-2 text-black no-underline ${
            active ? 'font-bold no-underline' : 'hover:text-underline hover:text-gray-800'
          }`}
        >
          About
        </Link>
      )}
    </>
  );
}
