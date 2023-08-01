// This file configures the initialization of Sentry for edge features (middleware, edge routes, and so on).
// The config you add here will be used whenever one of the edge features is loaded.
// Note that this config is unrelated to the Vercel Edge Runtime and is also required when running locally.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: 'https://63b51c52e1f32bd4633bfeabf57d489b@o32548.ingest.sentry.io/4505625265438720',

  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: 1,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,

  environment: process.env.NEXT_PUBLIC_APP_ENV,

  beforeSend: (event, hint) => {
    // https://github.com/getsentry/sentry-javascript/issues/1600
    console.error(hint.originalException || hint.syntheticException); // eslint-disable-line no-console
    if (process.env.NODE_ENV === "test") {
      return null; // this drops the event and nothing will be send to sentry
    }

    // keep this line separate to comment it out easily locally to watch errors
    if (process.env.NODE_ENV === "development") {
      return null; // this drops the event and nothing will be send to sentry
    }

    return event;
  }
});
