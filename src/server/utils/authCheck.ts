import { NotAuthorizedError } from '@/server/graphql/errors';
import { type User } from '@/server/user/user.repository';

export default function authCheck(user: User, id: string) {
  if (user.id !== id) {
    throw new NotAuthorizedError(`user ${user.id} not authorized to complete this operation`);
  }
}
