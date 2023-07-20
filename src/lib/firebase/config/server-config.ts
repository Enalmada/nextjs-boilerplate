import { env } from '@/env.mjs';

export const serverConfig = {
  useSecureCookies: env.USE_SECURE_COOKIES === 'true',
  firebaseApiKey: env.FIREBASE_API_KEY,
  serviceAccount: {
    projectId: env.FIREBASE_PROJECT_ID,
    clientEmail: env.FIREBASE_ADMIN_CLIENT_EMAIL,
    privateKey: env.FIREBASE_ADMIN_PRIVATE_KEY.replace(/\\n/g, '\n'),
  },
};

export const authConfig = {
  apiKey: serverConfig.firebaseApiKey,
  cookieName: 'AuthToken',
  cookieSignatureKeys: ['secret1', 'secret2'],
  cookieSerializeOptions: {
    path: '/',
    httpOnly: true,
    secure: serverConfig.useSecureCookies, // Set this to true on HTTPS environments
    sameSite: 'lax' as const,
    maxAge: 12 * 60 * 60 * 24 * 1000, // twelve days
  },
  serviceAccount: serverConfig.serviceAccount,
};
