import { db } from '@/server/db';
import { TaskTable, type Task, type TaskInput } from '@/server/db/schema';
import { createRepo } from 'drizzle-helpers';

export const TaskRepository = createRepo<Task, TaskInput>(db, TaskTable, db.query.TaskTable);

export default TaskRepository;
