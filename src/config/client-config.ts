export const clientConfig = {
  redirectUrl: process.env.NEXT_PUBLIC_REDIRECT_URL!, // eslint-disable-line @typescript-eslint/no-non-null-assertion
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!, // eslint-disable-line @typescript-eslint/no-non-null-assertion
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!, // eslint-disable-line @typescript-eslint/no-non-null-assertion
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL!, // eslint-disable-line @typescript-eslint/no-non-null-assertion
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!, // eslint-disable-line @typescript-eslint/no-non-null-assertion
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!, // eslint-disable-line @typescript-eslint/no-non-null-assertion
};
