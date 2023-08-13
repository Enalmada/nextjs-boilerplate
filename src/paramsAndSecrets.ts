import { Config, type Stack } from 'sst/constructs';

export function getParamsAndSecrets(stack: Stack) {
  const paramConfig = {
    APP_ENV: 'local',
    LOG_LEVEL: 'info',
    EDGE: 'false',
    REDIRECT_URL: (() => {
      switch (stack.stage) {
        case 'production':
          return '';
        case 'staging':
          return '';
        case 'dev':
          return 'https://d9zd9miv2djg4.cloudfront.net';
        default:
          return 'http://localhost:3000';
      }
    })(),
    USE_SECURE_COOKIES: 'true',
  };

  const publicConfig = [
    'NEXT_PUBLIC_APP_ENV',
    'NEXT_PUBLIC_REDIRECT_URL',
    'NEXT_PUBLIC_FIREBASE_PROJECT_ID',
    'NEXT_PUBLIC_FIREBASE_API_KEY',
    'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN',
    'NEXT_PUBLIC_FIREBASE_DATABASE_URL',
    'NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID',
    'NEXT_PUBLIC_AXIOM_TOKEN',
    'NEXT_PUBLIC_AXIOM_DATASET',
  ];

  const secretConfig = [
    'DATABASE_URL',
    'FIREBASE_SECRET1',
    'FIREBASE_SECRET2',
    'FIREBASE_API_KEY',
    'FIREBASE_ADMIN_CLIENT_EMAIL',
    'FIREBASE_ADMIN_PRIVATE_KEY',
    'AXIOM_TOKEN',
    'AXIOM_DATASET',
    'FIREBASE_PROJECT_ID',
    'FIREBASE_AUTH_DOMAIN',
    'FIREBASE_DATABASE_URL',
    'FIREBASE_MESSAGING_SENDER_ID',
  ];

  const parameters = Object.entries(paramConfig).map(([key, value]) => {
    return new Config.Parameter(stack, key, {
      value: process.env?.[key] || value,
    });
  });

  const publicParameters = publicConfig.map((key) => {
    return new Config.Parameter(stack, key, {
      value: '$' + key,
    });
  });

  const secrets = secretConfig.map((key) => {
    return new Config.Secret(stack, key);
  });

  return [...parameters, ...publicParameters, ...secrets];
}
