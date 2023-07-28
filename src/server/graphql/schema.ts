// import { env } from '@/env.mjs';

import { builder } from '@/server/graphql/builder';

import '@/server/task/task.model';
import '@/server/user/user.model';

// import Logger from '@/lib/logging/log-util';

export const schema = builder.toSchema({});

/*
// On local, write a new schema file
// https://pothos-graphql.dev/docs/guide/printing-schemas
if (env.APP_ENV === 'local') {
  const logger = new Logger('schema');
  try {
    const fs = await import('fs/promises');
    const path = await import('path');
    const graphql = await import('graphql');
    const schemaAsString = graphql.printSchema(graphql.lexicographicSortSchema(schema));
    const filePath = path.join(__dirname, '../../../../../../src/server/graphql/schema.graphql');
    let existingContent = null;
    try {
      existingContent = await fs.readFile(filePath, 'utf-8');
    } catch (error) {
      logger.debug(`Schema file not yet created.`);
    }
    if (!existingContent || existingContent !== schemaAsString) {
      await fs.writeFile(filePath, schemaAsString);
      logger.debug(`Schema file written to: ${filePath}`);
    }
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    logger.error('Error writing schema file:', error);
  }
}

 */
