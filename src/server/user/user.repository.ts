import { db } from '@/server/db';
import { UserTable, type User, type UserInput } from '@/server/db/schema';
import { createRepo } from 'drizzle-helpers';

export const UserRepository = createRepo<User, UserInput>(db, UserTable, db.query.UserTable);

export default UserRepository;
