import { db } from '@/server/db';
import { createRepo } from '@/server/db/DrizzleOrm';
import { TaskTable, type Task, type TaskInput } from '@/server/db/schema';

export const TaskRepository = createRepo<Task, TaskInput>(TaskTable, db.query.TaskTable);

export default TaskRepository;
