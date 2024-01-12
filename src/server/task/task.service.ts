/* clone-code ENTITY_HOOK
{
  "toFile": "src/server/<%= h.changeCase.camelCase(name) %>/<%= h.changeCase.camelCase(name) %>.service.ts",
  "replacements": [
    { "find": "Task", "replace": "<%= h.changeCase.pascalCase(name) %>" },
    { "find": "task", "replace": "<%= h.changeCase.camelCase(name) %>" },
    { "find": "TASK", "replace": "<%= h.changeCase.constantCase(name) %>" }
  ]
}
*/
import BaseService from '@/server/base/base.service';
import { db } from '@/server/db';
import { TaskTable, type Task, type TaskInput, type User } from '@/server/db/schema';

export interface TaskWithUser extends Task {
  user?: User;
}

export default class TaskService extends BaseService<TaskWithUser, TaskInput> {
  constructor() {
    super('Task', TaskTable, db.query.TaskTable);
  }
}
