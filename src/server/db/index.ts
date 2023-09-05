import { connectToDatabase } from 'drizzle-helpers';
import { type PostgresJsDatabase } from 'drizzle-orm/postgres-js';

import * as schema from './schema';

export const db: PostgresJsDatabase<typeof schema> = connectToDatabase<typeof schema>({
  nodeEnv: process.env.NODE_ENV || 'development',
  databaseUrl: process.env.DATABASE_URL!,
  schema: schema,
});
