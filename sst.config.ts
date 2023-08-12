// import { getParamsAndSecrets } from '@/paramsAndSecrets';
import { type SSTConfig } from 'sst';
import { NextjsSite } from 'sst/constructs';

export default {
  config(input) {
    let profileName;
    switch (input.stage) {
      case 'production':
        profileName = 'lbc-production';
        break;
      case 'staging':
        profileName = 'lbc-staging';
        break;
      case 'dev':
        profileName = 'lbc-dev';
        break;
      default:
        profileName = 'lbc-staging';
    }

    return {
      name: 't3-challenge',
      region: 'us-east-1',
      profile: profileName,
    };
  },
  stacks(app) {
    app.stack(function Site({ stack }) {
      const site = new NextjsSite(stack, 'site', {
        environment: {
          SKIP_ENV_VALIDATION: process.env.SKIP_ENV_VALIDATION!,
          APP_ENV: process.env.APP_ENV!,
          LOG_LEVEL: process.env.LOG_LEVEL!,
          EDGE: process.env.EDGE!,
          DATABASE_URL: process.env.DATABASE_URL!,
          REDIRECT_URL: process.env.REDIRECT_URL!,
          USE_SECURE_COOKIES: process.env.USE_SECURE_COOKIES!,
          FIREBASE_SECRET1: process.env.FIREBASE_SECRET1!,
          FIREBASE_SECRET2: process.env.FIREBASE_SECRET2!,
          FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID!,
          FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN!,
          FIREBASE_DATABASE_URL: process.env.FIREBASE_DATABASE_URL!,
          FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID!,
          FIREBASE_ADMIN_CLIENT_EMAIL: process.env.FIREBASE_ADMIN_CLIENT_EMAIL!,
          FIREBASE_ADMIN_PRIVATE_KEY: process.env.FIREBASE_ADMIN_PRIVATE_KEY!,
          AXIOM_TOKEN: process.env.AXIOM_TOKEN!,
          AXIOM_DATASET: process.env.AXIOM_DATASET!,
        },
        // bind: getParamsAndSecrets(stack),
      });

      stack.addOutputs({
        SiteUrl: site.url,
      });
    });
  },
} satisfies SSTConfig;
