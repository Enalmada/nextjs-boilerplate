// This file configures the initialization of Sentry on the client.
// The config you add here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: 'https://63b51c52e1f32bd4633bfeabf57d489b@o32548.ingest.sentry.io/4505625265438720',

  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: 1,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,

  replaysOnErrorSampleRate: 1.0,

  // This sets the sample rate to be 10%. You may want this to be 100% while
  // in development and sample at a lower rate in production
  replaysSessionSampleRate: 0.1,

  // You can remove this option if you're not planning to use the Sentry Session Replay feature:
  integrations: [
    new Sentry.Replay({
      // Additional Replay configuration goes in here, for example:
      maskAllText: true,
      blockAllMedia: true,
    }),
  ],

  environment: process.env.NEXT_PUBLIC_APP_ENV,

  beforeSend: (event, hint) => {
    // https://github.com/getsentry/sentry-javascript/issues/1600
    console.error(hint.originalException || hint.syntheticException); // eslint-disable-line no-console
    if (process.env.NODE_ENV === 'test') {
      return null; // this drops the event and nothing will be send to sentry
    }

    // keep this line separate to comment it out easily locally to watch errors
    if (process.env.NODE_ENV === 'development') {
      return null; // this drops the event and nothing will be send to sentry
    }

    return event;
  },
});