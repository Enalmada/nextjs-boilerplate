import { relations, type InferInsertModel, type InferSelectModel } from 'drizzle-orm';
import { integer, pgEnum, pgTable, timestamp, varchar } from 'drizzle-orm/pg-core';
import { nanoid } from 'nanoid';

// Parameterized insert don't seem to respect defaultFn
export const nanoString = (prefix: string) => `${prefix}_${nanoid()}`;

const generateIdField = (prefix: string) => {
  return varchar('id')
    .$defaultFn(() => nanoString(prefix))
    .primaryKey();
};

const generateAuditingFields = () => {
  return {
    version: integer('version').default(1).notNull(),
    createdBy: varchar('created_by'),
    createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
    updatedBy: varchar('updated_by'),
    updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow().notNull(),
  };
};

// USER

export enum UserRole {
  MEMBER = 'MEMBER',
  ADMIN = 'ADMIN',
}

export const UserRolesEnum = pgEnum('role', Object.values(UserRole) as [string, ...string[]]);

export const UserTable = pgTable('user', {
  id: generateIdField('usr'),
  firebaseId: varchar('firebase_id').unique(),
  name: varchar('name', { length: 255 }),
  email: varchar('email', { length: 320 }),
  image: varchar('image', { length: 2083 }),
  role: UserRolesEnum('role').default(UserRole.MEMBER).$type<UserRole>().notNull(),
  ...generateAuditingFields(),
});

export type User = InferSelectModel<typeof UserTable>;
export type UserInput = InferInsertModel<typeof UserTable>;

export const usersRelations = relations(UserTable, ({ many }) => ({
  task: many(TaskTable),
}));

/* ENTITY_HOOK
{
  "toPlacement": "bottom",
  "replacements": [
    { "find": "Task", "replace": "<%= h.changeCase.pascalCase(name) %>" },
    { "find": "task", "replace": "<%= h.changeCase.camelCase(name) %>" },
    { "find": "TASK", "replace": "<%= h.changeCase.constantCase(name) %>" },
    { "find": "tsk", "replace": "<%= h.changeCase.camelCase(name.slice(0, 3)) %>" }
  ]
}
*/
// TASK

export enum TaskStatus {
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
}

export const TaskStatusEnum = pgEnum('status', Object.values(TaskStatus) as [string, ...string[]]);

export const TaskTable = pgTable('task', {
  id: generateIdField('tsk'),
  title: varchar('name', { length: 256 }).notNull(),
  description: varchar('description', { length: 1024 }),
  status: TaskStatusEnum('status'),
  dueDate: timestamp('due_date', { mode: 'date' }),
  userId: varchar('user_id')
    .notNull()
    .references(() => UserTable.id, { onDelete: 'cascade' }),
  ...generateAuditingFields(),
});

export type Task = InferSelectModel<typeof TaskTable>;
export type TaskInput = InferInsertModel<typeof TaskTable>;

export const taskRelations = relations(TaskTable, ({ one }) => ({
  user: one(UserTable, {
    fields: [TaskTable.id],
    references: [UserTable.id],
  }),
}));

/* ENTITY_HOOK end */
