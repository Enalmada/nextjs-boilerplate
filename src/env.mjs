import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  server: {
    LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']).optional(),
    ANALYZE: z
      .enum(['true', 'false'])
      .optional()
      .transform((value) => value === 'true'),
    NODE_ENV: z.enum(['development', 'test', 'production']),
    APP_ENV: z.enum(['local', 'development', 'production']),
    DATABASE_URL: z.string().url(),
    FIREBASE_ADMIN_CLIENT_EMAIL: z.string().min(1),
    FIREBASE_ADMIN_PRIVATE_KEY: z.string().min(1),
    USE_SECURE_COOKIES: z.string().min(1),
    FIREBASE_PROJECT_ID: z.string().min(1),
    FIREBASE_API_KEY: z.string().min(1),
    FIREBASE_SECRET1: z.string().min(1),
    FIREBASE_SECRET2: z.string().min(1),
    AXIOM_TOKEN: z.string().optional(),
    AXIOM_DATASET: z.string().optional(),
  },
  client: {
    NEXT_PUBLIC_REDIRECT_URL: z.string().url(),
    //.transform((s) => new URL(s)),
    NEXT_PUBLIC_GRAPHQL_ENDPOINT: z.string(),
    NEXT_PUBLIC_FIREBASE_API_KEY: z.string().min(1),
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: z.string().min(1),
    NEXT_PUBLIC_FIREBASE_DATABASE_URL: z.string().url(),
    NEXT_PUBLIC_FIREBASE_PROJECT_ID: z.string().min(1),
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: z.string().min(1),
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_REDIRECT_URL: process.env.NEXT_PUBLIC_REDIRECT_URL,
    NEXT_PUBLIC_GRAPHQL_ENDPOINT: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
    NEXT_PUBLIC_FIREBASE_API_KEY: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    NEXT_PUBLIC_FIREBASE_DATABASE_URL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
    NEXT_PUBLIC_FIREBASE_PROJECT_ID: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  },
});
