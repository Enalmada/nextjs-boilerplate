import { env } from '@/env.mjs';

import { builder } from './builder';

import '@/server/task/task.model';
import '@/server/user/user.model';

import { getLogger } from '@/lib/logging/log-util';

const logger = getLogger('schema');

export const schema = builder.toSchema({});

// On local, write a new schema file
// https://pothos-graphql.dev/docs/guide/printing-schemas
if (env.APP_ENV === 'local') {
  try {
    const fs = await import('fs/promises');
    const path = await import('path');
    const graphql = await import('graphql');
    const schemaAsString = graphql.printSchema(graphql.lexicographicSortSchema(schema));
    const logger = getLogger('schema');
    const filePath = path.join(__dirname, '../../../../../src/server/graphql/schema.graphql');
    const existingContent = await fs.readFile(filePath, 'utf-8');
    if (existingContent !== schemaAsString) {
      await fs.writeFile(filePath, schemaAsString);
      logger.debug(`Schema file written to: ${filePath}`);
    }
  } catch (error) {
    logger.error('Error writing schema file:', error);
  }
}
