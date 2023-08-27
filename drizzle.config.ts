import type { Config } from 'drizzle-kit';

import { env } from './src/env.mjs';

export default {
  schema: './src/server/db/schema.ts',
  out: './src/server/db/migrate/migrations',
  driver: 'pg',
  dbCredentials: {
    connectionString: env.DATABASE_URL,
  },
} satisfies Config;
