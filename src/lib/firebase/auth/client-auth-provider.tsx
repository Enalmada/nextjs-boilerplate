'use client';

import * as React from 'react';
import { onIdTokenChanged, type User as FirebaseUser } from 'firebase/auth';
import { filterStandardClaims } from 'next-firebase-auth-edge/lib/auth/tenant';

import { AuthContext, type User } from './context';
import { useFirebaseAuth } from './firebase';

export interface AuthProviderProps {
  defaultUser: User | null;
  children: React.ReactNode;
}

export const AuthProvider: React.FunctionComponent<AuthProviderProps> = ({
  defaultUser,
  children,
}) => {
  const { getFirebaseAuth } = useFirebaseAuth();
  const [user, setUser] = React.useState(defaultUser);

  const handleIdTokenChanged = async (firebaseUser: FirebaseUser | null) => {
    if (!firebaseUser) {
      setUser(null);
      return;
    }

    const idTokenResult = await firebaseUser.getIdTokenResult();
    await fetch('/api/login', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${idTokenResult.token}`,
      },
    });
    setUser({
      ...firebaseUser,
      customClaims: filterStandardClaims(idTokenResult.claims),
      idToken: idTokenResult.token,
    });
  };

  // eslint-disable-next-line @typescript-eslint/require-await
  const registerChangeListener = async () => {
    const auth = getFirebaseAuth();
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    return onIdTokenChanged(auth, handleIdTokenChanged);
  };

  React.useEffect(() => {
    const unsubscribePromise = registerChangeListener();

    return () => {
      void unsubscribePromise.then((unsubscribe) => unsubscribe());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
