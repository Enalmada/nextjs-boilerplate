import type { ColumnType } from 'kysely';

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export const TaskStatus = {
  ACTIVE: 'ACTIVE',
  COMPLETED: 'COMPLETED',
} as const;
export type TaskStatus = (typeof TaskStatus)[keyof typeof TaskStatus];
export type Task = {
  id: Generated<string>;
  title: string;
  description: string | null;
  status: Generated<TaskStatus>;
  dueDate: Timestamp | null;
  createdAt: Generated<Timestamp>;
  updatedAt: Timestamp;
  userId: string;
};
export type User = {
  id: Generated<string>;
  firebaseId: string;
  name: string | null;
  email: string | null;
  image: string | null;
  createdAt: Generated<Timestamp>;
  updatedAt: Timestamp;
};
export type DB = {
  task: Task;
  user: User;
};
