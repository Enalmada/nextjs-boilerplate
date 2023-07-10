import { type User } from '@prisma/client';

export default function authCheck(user: User, id: string) {
  if (user.id !== id) {
    throw Error('unauthorized');
  }
}
