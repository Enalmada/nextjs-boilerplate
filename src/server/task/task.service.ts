import Logger from '@/lib/logging/log-util';
import { type Task, type TaskInput, type User } from '@/server/db/schema';
import { NotAuthorizedError, NotFoundError, OptimisticLockError } from '@/server/graphql/errors';
import { type MyContextType } from '@/server/graphql/yoga';
import authCheck from '@/server/utils/authCheck';

import TaskRepository from './task.repository';

export default class TaskService {
  private readonly logger = new Logger(TaskService.name);

  async tasks(user: User, ctx: MyContextType) {
    const logger = this.logger.logMethodStart(this.tasks.name, ctx);

    if (!user) {
      throw new NotAuthorizedError(`user required to complete this operation`, logger);
    }

    return TaskRepository.findMany({ userId: user.id });
  }

  async task(user: User, id: string, ctx: MyContextType) {
    const logger = this.logger.logMethodStart(this.task.name, ctx);

    const task = await TaskRepository.findFirst({ id });

    if (!task) {
      throw new NotFoundError(`task ${id} not found`, logger);
    }

    authCheck(user, task.userId, logger);

    return task;
  }

  async create(user: User, input: TaskInput, ctx: MyContextType): Promise<Task> {
    this.logger.logMethodStart(this.create.name, ctx, {
      data: { ...input },
    });

    return TaskRepository.create({
      ...input,
      updatedAt: new Date(),
      createdAt: new Date(),
      version: 1,
      userId: user.id,
    });
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

    authCheck(user, task.userId, logger);

    return TaskRepository.update(id, {
      ...input,
      updatedAt: new Date(),
      version: task.version + 1,
    });
  }

  async delete(user: User, id: string, ctx: MyContextType): Promise<Task> {
    const logger = this.logger.logMethodStart(this.delete.name, ctx, { taskId: id });

    const task = await TaskRepository.findFirst({ id });

    if (!task) {
      throw new NotFoundError(`Task ${id} not found`, logger);
    }

    authCheck(user, task.userId, logger);

    return TaskRepository.delete(id);
  }
}
