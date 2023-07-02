export const serverConfig = {
  useSecureCookies: process.env.USE_SECURE_COOKIES === "true",
  firebaseApiKey: process.env.FIREBASE_API_KEY!, // eslint-disable-line @typescript-eslint/no-non-null-assertion
  serviceAccount: {
    projectId: process.env.FIREBASE_PROJECT_ID!, // eslint-disable-line @typescript-eslint/no-non-null-assertion
    clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL!, // eslint-disable-line @typescript-eslint/no-non-null-assertion
    privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY!.replace(/\\n/g, "\n"), // eslint-disable-line @typescript-eslint/no-non-null-assertion
  },
};

export const authConfig = {
  apiKey: serverConfig.firebaseApiKey,
  cookieName: "AuthToken",
  cookieSignatureKeys: [process.env.FIREBASE_SECRET1!, process.env.FIREBASE_SECRET2!], // eslint-disable-line @typescript-eslint/no-non-null-assertion
  cookieSerializeOptions: {
    path: "/",
    httpOnly: true,
    secure: serverConfig.useSecureCookies, // Set this to true on HTTPS environments
    sameSite: "strict" as const,
    maxAge: 12 * 60 * 60 * 24 * 1000, // twelve days
  },
  serviceAccount: serverConfig.serviceAccount,
};
