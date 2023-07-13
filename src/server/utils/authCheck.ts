import { type User } from '@prisma/client';
import { GraphQLError } from 'graphql';

export default function authCheck(user: User, id: string) {
  if (user.id !== id) {
    throw new GraphQLError(`user ${user.id} unauthorized to complete this operation`);
  }
}
