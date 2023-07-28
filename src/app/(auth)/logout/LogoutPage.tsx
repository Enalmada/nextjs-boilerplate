'use client';

import { useEffect } from 'react';
import { useFirebaseAuth } from '@/lib/firebase/auth/firebase';
import { useApolloClient } from '@apollo/client';
import { signOut } from 'firebase/auth';

export default function LogoutPage() {
  const client = useApolloClient();
  const { getFirebaseAuth } = useFirebaseAuth();

  useEffect(() => {
    const clearCache = async () => {
      try {
        await client.clearStore();
        const auth = getFirebaseAuth();
        await signOut(auth);
        await fetch('/api/logout', {
          method: 'GET',
        });
        // router.refresh(); // This seems necessary to avoid a full window.reload
        // TODO get router.replace working again
        // router.replace('/');

        window.location.replace('/');
      } catch (error) {
        console.error('Error clearing Apollo Client cache:', error);
      }
    };

    void clearCache();
    // getFirebaseAuth dependency will cause infinite loading
    // eslint-disable-next-line
  }, []);

  return null;
}
