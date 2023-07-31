import { writeFileSync } from 'fs';
import path from 'path';
import { env } from '@/env.mjs';
import Logger from '@/lib/logging/log-util';
import { builder } from '@/server/graphql/builder';
import { lexicographicSortSchema, printSchema } from 'graphql';

import '@/server/task/task.model';
import '@/server/user/user.model';

export const schema = builder.toSchema({});

// On local, write a new schema file
// https://pothos-graphql.dev/docs/guide/printing-schemas
if (env.APP_ENV === 'local') {
  const logger = new Logger('schema');
  try {
    const schema = builder.toSchema();
    const schemaAsString = printSchema(lexicographicSortSchema(schema));
    const filePath = path.join(__dirname, '../../../../../../src/server/graphql/schema.graphql');
    writeFileSync(filePath, schemaAsString);
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    logger.error('Error writing schema file:', error);
  }
}
