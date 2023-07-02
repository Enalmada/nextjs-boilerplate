"use client";

import * as React from "react";
import { startTransition } from "react";
import { clientConfig } from "@/config/client-config";
import type { User as FirebaseUser } from "firebase/auth";
import { type IdTokenResult } from "firebase/auth";

import { AuthContext } from "./context";
import { useFirebaseAuth } from "./firebase";
import { type Tenant } from "./types";

const mapFirebaseResponseToTenant = (result: IdTokenResult, user: FirebaseUser): Tenant => {
  const providerData = user.providerData && user.providerData[0];

  if (!user.isAnonymous && providerData) {
    return {
      id: user.uid,
      name: providerData.displayName || user.displayName || user.email || null,
      email: providerData.email || null,
      emailVerified: user.emailVerified || false,
      photoUrl: providerData.photoURL || null,
      customClaims: {},
      isAnonymous: user.isAnonymous,
      idToken: result.token,
    };
  }

  return {
    id: user.uid,
    name: user.displayName || providerData?.displayName || user.email || null,
    email: user.email || null,
    emailVerified: user.emailVerified || false,
    photoUrl: user.photoURL || null,
    customClaims: {},
    isAnonymous: user.isAnonymous,
    idToken: result.token,
  };
};

export interface AuthProviderProps {
  defaultTenant: Tenant | null;
  children: React.ReactNode;
}

export const AuthProvider: React.FunctionComponent<AuthProviderProps> = ({
  defaultTenant,
  children,
}) => {
  const { getFirebaseAuth } = useFirebaseAuth(clientConfig);
  const firstLoadRef = React.useRef(true);
  const [tenant, setTenant] = React.useState(defaultTenant);

  const handleIdTokenChanged = React.useCallback(
    async (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser && tenant && firebaseUser.uid === tenant.id) {
        firstLoadRef.current = false;
        return;
      }

      const auth = await getFirebaseAuth();

      const signInAnonymouslyEnabled = false;
      if (signInAnonymouslyEnabled && !firebaseUser && firstLoadRef.current) {
        const { signInAnonymously } = await import("firebase/auth");
        firstLoadRef.current = false;
        const credential = await signInAnonymously(auth);
        await fetch("/api/login", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${(await credential.user.getIdTokenResult()).token}`,
          },
        });
        return;
      }

      if (!firebaseUser) {
        firstLoadRef.current = false;
        startTransition(() => {
          setTenant(null);
        });
        return;
      }

      firstLoadRef.current = false;
      const tokenResult = await firebaseUser.getIdTokenResult();
      startTransition(() => {
        setTenant(mapFirebaseResponseToTenant(tokenResult, firebaseUser));
      });
    },
    [getFirebaseAuth, tenant, setTenant]
  );

  const registerChangeListener = React.useCallback(async () => {
    const auth = await getFirebaseAuth();
    const { onIdTokenChanged } = await import("firebase/auth");
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    return onIdTokenChanged(auth, handleIdTokenChanged);
  }, [getFirebaseAuth, handleIdTokenChanged]);

  React.useEffect(() => {
    const unsubscribePromise = registerChangeListener();

    return () => {
      void unsubscribePromise.then((unsubscribe) => unsubscribe());
    };
  }, [registerChangeListener]);

  return (
    <AuthContext.Provider
      value={{
        tenant,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
