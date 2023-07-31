import { db } from '@/server/db/kyselyDb';
import { type Insertable, type Selectable, type Updateable } from 'kysely';

import { type Task as TaskTable } from '../db/types';

export type Task = Selectable<TaskTable>;
export type TaskNew = Insertable<TaskTable>;
export type TaskUpdate = Updateable<TaskTable>;

const taskTable = 'task';

const taskRepo = {
  findFirst: async function (id: string) {
    return db.selectFrom('task').where('id', '=', id).selectAll().executeTakeFirst();
  },
  findMany: async function (criteria: Partial<Task>) {
    let query = db.selectFrom(taskTable);

    if (criteria.id) {
      query = query.where('id', '=', criteria.id);
    }

    if (criteria.userId) {
      query = query.where('userId', '=', criteria.userId);
    }

    if (criteria.createdAt) {
      query = query.where('createdAt', '=', criteria.createdAt);
    }

    return query.selectAll().execute();
  },
  create: async function (createWith: TaskNew) {
    return db.insertInto(taskTable).values(createWith).returningAll().executeTakeFirstOrThrow();
  },
  update: async function (id: string, updateWith: TaskUpdate) {
    return db
      .updateTable(taskTable)
      .set(updateWith)
      .where('id', '=', id)
      .returningAll()
      .executeTakeFirst();
  },
  delete: async function (id: string) {
    return db.deleteFrom(taskTable).where('id', '=', id).returningAll().executeTakeFirst();
  },
};

export default taskRepo;
