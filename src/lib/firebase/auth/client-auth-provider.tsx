'use client';

import * as React from 'react';
import { onIdTokenChanged, type User as FirebaseUser, type IdTokenResult } from 'firebase/auth';
import { filterStandardClaims } from 'next-firebase-auth-edge/lib/auth/claims';

import { AuthContext, type User } from './context';
import { useFirebaseAuth } from './firebase';

export interface AuthProviderProps {
  defaultUser: User | null;
  children: React.ReactNode;
}

function toUser(user: FirebaseUser, idTokenResult: IdTokenResult): User {
  return {
    ...user,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-assignment
    customClaims: filterStandardClaims(idTokenResult.claims),
    idToken: idTokenResult.token,
  };
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

    setUser(toUser(firebaseUser, idTokenResult));
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
