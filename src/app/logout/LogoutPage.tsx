'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useFirebaseAuth } from '@/lib/firebase/auth/firebase';
import { clientConfig } from '@/lib/firebase/config/client-config';
import { useApolloClient } from '@apollo/client';

export default function LogoutPage() {
  const client = useApolloClient();
  const { getFirebaseAuth } = useFirebaseAuth(clientConfig);
  const router = useRouter();

  useEffect(() => {
    const clearCache = async () => {
      try {
        await client.clearStore();
        const auth = await getFirebaseAuth();
        const { signOut } = await import('firebase/auth');
        await signOut(auth);
        // TODO: tell parent layout to render a logging out loading
        //setHasLoggedOut(true);
        await fetch('/api/logout', {
          method: 'GET',
        });
        router.replace('/');
      } catch (error) {
        console.error('Error clearing Apollo Client cache:', error);
      }
    };

    void clearCache();
  }, [client, getFirebaseAuth, router]);

  return null;
}
