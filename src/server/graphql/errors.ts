// https://escape.tech/blog/graphql-errors-the-good-the-bad-and-the-ugly/
// https://the-guild.dev/graphql/yoga-server/tutorial/basic/09-error-handling#recap-of-the-encountered-error
// https://blog.logrocket.com/handling-graphql-errors-like-a-champ-with-unions-and-interfaces/
import type Logger from '@/lib/logging/log-util';
import { GraphQLError } from 'graphql';

export class NotAuthorizedError extends GraphQLError {
  constructor(message: string, logger: Logger) {
    super(message, {
      extensions: {
        code: 'NOT_AUTHORIZED',
        http: { status: 401 },
      },
    });

    logger.debug(`NotAuthorizedError: ${message}`);
  }
}

export class NotFoundError extends GraphQLError {
  constructor(message: string, logger: Logger) {
    super(message, {
      extensions: {
        code: 'NOT_FOUND',
        http: { status: 404 },
      },
    });

    logger.warn(`NotFoundError: ${message}`);
  }
}

export class OptimisticLockError extends GraphQLError {
  constructor(message: string, logger: Logger) {
    super(message, {
      extensions: {
        code: 'OPTIMISTIC_LOCK',
        http: { status: 409 },
      },
    });

    logger.debug(`OptimisticLockError: ${message}`);
  }
}
