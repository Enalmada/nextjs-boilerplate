/* ENTITY_HOOK
{
  "toFile": "src/server/<%= h.changeCase.camelCase(name) %>/<%= h.changeCase.camelCase(name) %>.service.ts",
  "replacements": [
    { "find": "Task", "replace": "<%= h.changeCase.pascalCase(name) %>" },
    { "find": "task", "replace": "<%= h.changeCase.camelCase(name) %>" },
    { "find": "TASK", "replace": "<%= h.changeCase.constantCase(name) %>" }
  ]
}
*/
import Logger from '@/lib/logging/log-util';
import { type Task, type TaskInput } from '@/server/db/schema';
import { NotFoundError, OptimisticLockError } from '@/server/graphql/errors';
import { type MyContextType } from '@/server/graphql/server';
import { sortAndPagination, type TableInput } from '@/server/graphql/sortAndPagination';
import { accessCheck } from '@/server/utils/accessCheck';
import { type Page } from '@enalmada/drizzle-helpers';

import TaskRepository from './task.repository';

export interface TasksInput extends TableInput {
  where?: Partial<Task>;
}

export default class TaskService {
  private readonly logger = new Logger(TaskService.name);

  async tasks(input: TasksInput | undefined, ctx: MyContextType): Promise<Page<Task>> {
    const logger = this.logger.logMethodStart(this.tasks.name, ctx, { ...input });

    accessCheck(logger, ctx.currentUser, 'list', 'Task', input?.where);

    const { order, paging } = sortAndPagination(input);

    return TaskRepository.findPage({ criteria: input?.where, order, paging });
  }

  async task(id: string, ctx: MyContextType) {
    const logger = this.logger.logMethodStart(this.task.name, ctx);

    const task = await TaskRepository.findFirst({ id });

    if (!task) {
      throw new NotFoundError(`task ${id} not found`, logger);
    }

    accessCheck(logger, ctx.currentUser, 'read', 'Task', task);

    return task;
  }

  async create(input: TaskInput, ctx: MyContextType): Promise<Task> {
    const logger = this.logger.logMethodStart(this.create.name, ctx, {
      data: { ...input },
    });

    const createWith = {
      ...input,
      updatedAt: new Date(),
      createdAt: new Date(),
      version: 1,
      userId: ctx.currentUser!.id,
    };

    accessCheck(logger, ctx.currentUser, 'create', 'Task', createWith);

    return TaskRepository.create(createWith);
  }

  async update(id: string, input: TaskInput, ctx: MyContextType): Promise<Task> {
    const logger = this.logger.logMethodStart(this.update.name, ctx, {
      data: { id, ...input },
    });

    const task = await TaskRepository.findFirst({ id });

    if (!task) {
      throw new NotFoundError(`task ${id} not found`, logger);
    }

    if (task.version !== input.version) {
      // TODO notify user that task has changed in another tab, device, or session.
      throw new OptimisticLockError(
        `Task has changed since loading.  Please reload and try again.`,
        logger
      );
    }

    accessCheck(logger, ctx.currentUser, 'update', 'Task', task);

    const updateWith = {
      ...input,
      updatedAt: new Date(),
      version: task.version + 1,
    };

    return TaskRepository.update(id, updateWith);
  }

  async delete(id: string, ctx: MyContextType): Promise<Task> {
    const logger = this.logger.logMethodStart(this.delete.name, ctx, { taskId: id });

    const task = await TaskRepository.findFirst({ id });

    if (!task) {
      throw new NotFoundError(`Task ${id} not found`, logger);
    }

    accessCheck(logger, ctx.currentUser, 'delete', 'Task', task);

    return TaskRepository.delete(id);
  }
}
