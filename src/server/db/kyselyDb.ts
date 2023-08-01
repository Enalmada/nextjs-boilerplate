import { env } from '@/env.mjs';
import { CamelCasePlugin, Kysely } from 'kysely';
import { PostgresJSDialect } from 'kysely-postgres-js';
import postgres from 'postgres';

import type { DB } from './types';

export const db = new Kysely<DB>({
  dialect: new PostgresJSDialect({
    connectionString: env.DATABASE_URL,
    options: {
      max: 10,
    },
    postgres,
  }),
  plugins: [new CamelCasePlugin()],
});
