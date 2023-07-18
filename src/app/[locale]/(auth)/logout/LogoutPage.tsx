'use client';

import { useEffect } from 'react';
import { useFirebaseAuth } from '@/lib/firebase/auth/firebase';
import { signOut } from 'firebase/auth';

export default function LogoutPage() {
  const { getFirebaseAuth } = useFirebaseAuth();

  useEffect(() => {
    const clearCache = async () => {
      try {
        // Urql cache is unique to tenant and will be cleared when it changes
        // https://formidable.com/open-source/urql/docs/advanced/authentication/#cache-invalidation-on-logout
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
