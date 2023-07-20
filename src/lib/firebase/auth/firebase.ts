import { getApp, getApps, initializeApp, type FirebaseOptions } from 'firebase/app';
import { connectAuthEmulator, getAuth } from 'firebase/auth';

import { clientConfig } from '../config/client-config';

const getFirebaseApp = (options: FirebaseOptions) => {
  return !getApps().length ? initializeApp(options) : getApp();
};

export const useFirebaseAuth = () => {
  const getFirebaseAuth = () => {
    const auth = getAuth(getFirebaseApp(clientConfig));

    if (process.env.NEXT_PUBLIC_EMULATOR_HOST) {
      // https://stackoverflow.com/questions/73605307/firebase-auth-emulator-fails-intermittently-with-auth-emulator-config-failed
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
      (auth as unknown as any)._canInitEmulator = true;
      connectAuthEmulator(auth, process.env.NEXT_PUBLIC_EMULATOR_HOST, {
        disableWarnings: true,
      });
    }

    return auth;
  };

  return { getFirebaseAuth };
};
