import { db } from '@/server/db/kyselyDb';
import { type Insertable, type Selectable, type Updateable } from 'kysely';

import { type User as UserTable } from '../db/types';

export type User = Selectable<UserTable>;
export type UserNew = Insertable<UserTable>;
export type UserUpdate = Updateable<UserTable>;

const userTable = 'user';

const userRepo = {
  findFirst: async function (criteria: Partial<User>) {
    let query = db.selectFrom(userTable);

    if (criteria.id) {
      query = query.where('id', '=', criteria.id);
    }

    if (criteria.firebaseId) {
      query = query.where('firebaseId', '=', criteria.firebaseId);
    }

    return query.selectAll().executeTakeFirst();
  },
  findMany: async function (criteria: Partial<User>) {
    let query = db.selectFrom(userTable);

    if (criteria.id) {
      query = query.where('id', '=', criteria.id);
    }

    if (criteria.createdAt) {
      query = query.where('createdAt', '=', criteria.createdAt);
    }

    return query.selectAll().execute();
  },
  create: async function (createWith: UserNew) {
    return db.insertInto(userTable).values(createWith).returningAll().executeTakeFirstOrThrow();
  },
  update: async function (id: string, updateWith: UserUpdate) {
    return db
      .updateTable(userTable)
      .set(updateWith)
      .where('id', '=', id)
      .returningAll()
      .executeTakeFirstOrThrow();
  },
  delete: async function (id: string) {
    return db.deleteFrom(userTable).where('id', '=', id).returningAll().executeTakeFirst();
  },
};

export default userRepo;
