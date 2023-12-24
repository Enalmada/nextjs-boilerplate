/* clone-code ENTITY_HOOK
{
  "toFile": "src/server/<%= h.changeCase.camelCase(name) %>/<%= h.changeCase.camelCase(name) %>.repository.ts",
  "replacements": [
    { "find": "Task", "replace": "<%= h.changeCase.pascalCase(name) %>" },
    { "find": "task", "replace": "<%= h.changeCase.camelCase(name) %>" },
    { "find": "TASK", "replace": "<%= h.changeCase.constantCase(name) %>" }
  ]
}
*/
import { db } from '@/server/db';
import { TaskTable, type Task, type TaskInput } from '@/server/db/schema';
import type * as schema from '@/server/db/schema';
import { createRepo } from '@enalmada/drizzle-helpers';

export const TaskRepository = createRepo<typeof schema, Task, TaskInput>(
  db,
  TaskTable,
  db.query.TaskTable
);

export default TaskRepository;
