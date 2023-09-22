import { db } from '@/server/db';
import { UserTable, type User, type UserInput } from '@/server/db/schema';
import type * as schema from '@/server/db/schema';
import { createRepo } from '@enalmada/drizzle-helpers';

export const UserRepository = createRepo<typeof schema, User, UserInput>(
  db,
  UserTable,
  db.query.UserTable
);

export default UserRepository;
