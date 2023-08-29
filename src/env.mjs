// @ts-check

import { enumType, minLength, object, optional, safeParse, string } from 'valibot';

/**
 * @param {string} key - The key name for the required string.
 * @returns {unknown} A Valibot object representing the required string.
 */
const required = (key) => string([minLength(1, `${key} required`)]);

/**
 * @param {any} schemaDefinition - The schema definition object.
 * @returns {unknown} A Valibot object representing the created schema.
 */
const createEnvSchema = (schemaDefinition) => object(schemaDefinition);

/**
 * @param {any} schema - The Valibot schema to validate against.
 * @param {Object.<string, string | undefined>} envVars - The environment variables to validate.
 * @returns {any} The parsed environment variables if successful.
 */
function validateEnv(schema, envVars) {
  if (process.env.SKIP_ENV_VALIDATION !== 'true') {
    const parsed = safeParse(schema, envVars);
    if (!parsed.success) {
      const reducedIssues = reduceIssues(parsed.issues);
      console.error('Issue with environment variables: ' + JSON.stringify(reducedIssues));
      process.exit(1);
    }
    return parsed;
  }
}

/**
 * @param {Array.<any>} issues - The list of issues to reduce.
 * @returns {Array.<Object>} The reduced list of issues containing only the attribute, input, and message.
 */
function reduceIssues(issues) {
  return issues.map((issue) => ({
    attribute: issue.path?.[0].key,
    input: issue.input,
    message: issue.message,
  }));
}

const serverSchema = createEnvSchema({
  LOG_LEVEL: enumType(['debug', 'info', 'warn', 'error']),
  ANALYZE: optional(string()),
  APP_ENV: enumType(['local', 'development', 'staging', 'production']),
  DATABASE_URL: required('DATABASE_URL'),
  FIREBASE_ADMIN_CLIENT_EMAIL: required('FIREBASE_ADMIN_CLIENT_EMAIL'),
  FIREBASE_ADMIN_PRIVATE_KEY: required('FIREBASE_ADMIN_PRIVATE_KEY'),
  USE_SECURE_COOKIES: required('USE_SECURE_COOKIES'),
  FIREBASE_PROJECT_ID: required('FIREBASE_PROJECT_ID'),
  FIREBASE_API_KEY: required('FIREBASE_API_KEY'),
  FIREBASE_SECRET1: required('FIREBASE_SECRET1'),
  FIREBASE_SECRET2: required('FIREBASE_SECRET2'),
  AXIOM_TOKEN: optional(string()),
  AXIOM_DATASET: optional(string()),
});

const clientSchema = createEnvSchema({
  NEXT_PUBLIC_APP_ENV: required('NEXT_PUBLIC_APP_ENV required'),
  NEXT_PUBLIC_REDIRECT_URL: required('NEXT_PUBLIC_REDIRECT_URL required'),
  NEXT_PUBLIC_FIREBASE_API_KEY: required('NEXT_PUBLIC_FIREBASE_API_KEY required'),
  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: required('NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN required'),
  NEXT_PUBLIC_FIREBASE_DATABASE_URL: required('NEXT_PUBLIC_FIREBASE_DATABASE_URL required'),
  NEXT_PUBLIC_FIREBASE_PROJECT_ID: required('NEXT_PUBLIC_FIREBASE_PROJECT_ID required'),
  NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: required(
    'NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID required'
  ),
});

const serverEnv = validateEnv(serverSchema, {
  LOG_LEVEL: process.env.LOG_LEVEL,
  ANALYZE: process.env.ANALYZE,
  APP_ENV: process.env.APP_ENV,
  DATABASE_URL: process.env.DATABASE_URL,
  FIREBASE_ADMIN_CLIENT_EMAIL: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
  FIREBASE_ADMIN_PRIVATE_KEY: process.env.FIREBASE_ADMIN_PRIVATE_KEY,
  USE_SECURE_COOKIES: process.env.USE_SECURE_COOKIES,
  FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
  FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
  FIREBASE_SECRET1: process.env.FIREBASE_SECRET1,
  FIREBASE_SECRET2: process.env.FIREBASE_SECRET2,
  AXIOM_TOKEN: process.env.AXIOM_TOKEN,
  AXIOM_DATASET: process.env.AXIOM_DATASET,
});

const clientEnv = validateEnv(clientSchema, {
  NEXT_PUBLIC_APP_ENV: process.env.NEXT_PUBLIC_APP_ENV,
  NEXT_PUBLIC_REDIRECT_URL: process.env.NEXT_PUBLIC_REDIRECT_URL,
  NEXT_PUBLIC_FIREBASE_API_KEY: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  NEXT_PUBLIC_FIREBASE_DATABASE_URL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  NEXT_PUBLIC_FIREBASE_PROJECT_ID: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
});

export { serverEnv, clientEnv };

/*
old t3-oss which didn't compile to standalone, allow runtime variables.
// Why zod: https://colinhacks.com/essays/zod
export const env = createEnv({
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  server: {
    LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']).optional(),
    ANALYZE: z
      .enum(['true', 'false'])
      .optional()
      .transform((value) => value === 'true'),
    APP_ENV: z.enum(['local', 'development', 'staging', 'production']),
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
    NEXT_PUBLIC_APP_ENV: z.string(),
    NEXT_PUBLIC_REDIRECT_URL: z.string().url(),
    //.transform((s) => new URL(s)),
    NEXT_PUBLIC_FIREBASE_API_KEY: z.string().min(1),
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: z.string().min(1),
    NEXT_PUBLIC_FIREBASE_DATABASE_URL: z.string().url(),
    NEXT_PUBLIC_FIREBASE_PROJECT_ID: z.string().min(1),
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: z.string().min(1),
  }
});
*/
