import { cookies } from "next/headers";
import { authConfig, serverConfig } from "@/config/server-config";
import { type Tokens } from "next-firebase-auth-edge/lib/auth";
import { filterStandardClaims } from "next-firebase-auth-edge/lib/auth/tenant";
import { getTokens } from "next-firebase-auth-edge/lib/next/tokens";

import { AuthProvider } from "./client-auth-provider";
import { type Tenant } from "./types";

const mapTokensToTenant = ({ token, decodedToken }: Tokens): Tenant => {
  const customClaims = filterStandardClaims(decodedToken);

  const {
    uid,
    email,
    email_verified: emailVerified,
    picture: photoURL,
    name: displayName,
  } = decodedToken;

  return {
    id: uid,
    email: email ?? null,
    customClaims,
    isAnonymous: !emailVerified,
    emailVerified: emailVerified ?? false,
    name: (displayName as string) ?? null,
    photoUrl: photoURL ?? null,
    idToken: token,
  };
};

export async function ServerAuthProvider({ children }: { children: React.ReactNode }) {
  const tokens = await getTokens(cookies(), {
    serviceAccount: serverConfig.serviceAccount,
    apiKey: serverConfig.firebaseApiKey,
    cookieName: authConfig.cookieName,
    cookieSignatureKeys: authConfig.cookieSignatureKeys,
  });

  const tenant = tokens ? mapTokensToTenant(tokens) : null;

  return <AuthProvider defaultTenant={tenant}>{children}</AuthProvider>;
}
