import { db } from '@/server/db';
import { createRepo } from '@/server/db/DrizzleOrm';
import { UserTable, type User, type UserInput } from '@/server/db/schema';

export const UserRepository = createRepo<User, UserInput>(UserTable, db.query.UserTable);

export default UserRepository;
