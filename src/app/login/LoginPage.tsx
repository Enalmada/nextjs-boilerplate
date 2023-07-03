"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useFirebaseAuth } from "@/auth/firebase";
import { clientConfig } from "@/config/client-config";
import { Button } from "@/ui/button";
import { LoadingIcon } from "@/ui/icons";

import { getGoogleProvider, loginWithProvider } from "./firebase";
import styles from "./login.module.css";

export function LoginPage() {
  const params = useSearchParams();
  const [hasLogged, setHasLogged] = useState(false);
  const { getFirebaseAuth } = useFirebaseAuth(clientConfig);
  const router = useRouter();

  const handleLoginWithGoogle = async () => {
    setHasLogged(false);
    const { GoogleAuthProvider } = await import("firebase/auth");
    const auth = await getFirebaseAuth();
    const tenant = await loginWithProvider(
      auth,
      await getGoogleProvider(auth),
      // eslint-disable-next-line @typescript-eslint/unbound-method
      GoogleAuthProvider.credentialFromError
    );
    await fetch("/api/login", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${tenant.idToken}`,
      },
    });
    setHasLogged(true);
    const redirect = params?.get("redirect");
    router.refresh(); // This seems necessary to avoid a full window.reload
    router.push(redirect ?? "/");
  };

  return (
    <div className={styles.page}>
      {!hasLogged && (
        <Button disabled={hasLogged} onClick={() => void handleLoginWithGoogle()}>
          Log in with Google
        </Button>
      )}

      {hasLogged && (
        <div className={styles.info}>
          <p>
            Redirecting to <strong>{params?.get("redirect") || "/"}</strong> <LoadingIcon />
          </p>
        </div>
      )}
    </div>
  );
}
