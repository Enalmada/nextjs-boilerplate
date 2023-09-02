import Logger from '@/lib/logging/log-util';
import { type Task, type TaskInput, type User } from '@/server/db/schema';
import { NotFoundError, OptimisticLockError } from '@/server/graphql/errors';
import { type MyContextType } from '@/server/graphql/yoga';
import { accessCheck } from '@/server/utils/accessCheck';

import TaskRepository from './task.repository';

export default class TaskService {
  private readonly logger = new Logger(TaskService.name);

  async tasks(user: User, ctx: MyContextType) {
    const logger = this.logger.logMethodStart(this.tasks.name, ctx);

    const criteria = { userId: user.id };

    accessCheck(logger, user, 'list', 'Task', criteria);

    return TaskRepository.findMany(criteria);
  }

  async task(user: User, id: string, ctx: MyContextType) {
    const logger = this.logger.logMethodStart(this.task.name, ctx);

    const task = await TaskRepository.findFirst({ id });

    if (!task) {
      throw new NotFoundError(`task ${id} not found`, logger);
    }

    accessCheck(logger, user, 'read', 'Task', task);

    return task;
  }

  async create(user: User, input: TaskInput, ctx: MyContextType): Promise<Task> {
    const logger = this.logger.logMethodStart(this.create.name, ctx, {
      data: { ...input },
    });

    const createWith = {
      ...input,
      updatedAt: new Date(),
      createdAt: new Date(),
      version: 1,
      userId: user.id,
    };

    accessCheck(logger, user, 'create', 'Task', createWith);

    return TaskRepository.create(createWith);
  }

  async update(user: User, id: string, input: TaskInput, ctx: MyContextType): Promise<Task> {
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

    accessCheck(logger, user, 'update', 'Task', task);

    const updateWith = {
      ...input,
      updatedAt: new Date(),
      version: task.version + 1,
    };

    return TaskRepository.update(id, updateWith);
  }

  async delete(user: User, id: string, ctx: MyContextType): Promise<Task> {
    const logger = this.logger.logMethodStart(this.delete.name, ctx, { taskId: id });

    const task = await TaskRepository.findFirst({ id });

    if (!task) {
      throw new NotFoundError(`Task ${id} not found`, logger);
    }

    accessCheck(logger, user, 'delete', 'Task', task);

    return TaskRepository.delete(id);
  }
}
