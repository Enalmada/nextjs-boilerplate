import type Logger from '@/lib/logging/log-util';
import { type User } from '@/server/db/schema';
import { NotAuthorizedError } from '@/server/graphql/errors';

export default function authCheck(user: User, id: string, logger: Logger) {
  if (user.id !== id) {
    // Throw an error type that can be processed by yoga.maskError to a 401
    throw new NotAuthorizedError('You are not authorized to complete this operation.', logger);
  }
}
