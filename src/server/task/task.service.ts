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
import { type Task, type TaskInput } from '@/server/db/schema';

import TaskRepository from './task.repository';

export default class TaskService extends BaseService<Task, TaskInput, typeof TaskRepository> {
  constructor() {
    super('Task', TaskRepository);
  }
}
