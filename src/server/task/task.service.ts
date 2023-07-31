import Logger from '@/lib/logging/log-util';
import { NotAuthorizedError, NotFoundError } from '@/server/graphql/errors';
import { type MyContextType } from '@/server/graphql/yoga';
import { type User } from '@/server/user/user.repository';
import authCheck from '@/server/utils/authCheck';

import taskRepo, { type TaskNew, type TaskUpdate } from './task.repository';

export default class TaskService {
  private readonly logger = new Logger(TaskService.name);

  async tasks(user: User, ctx: MyContextType) {
    this.logger.logMethodStart(this.tasks.name, ctx);

    if (!user) {
      throw new NotAuthorizedError(`user required to complete this operation`);
    }

    return await taskRepo.findMany({ userId: user.id });
  }

  async task(user: User, id: string, ctx: MyContextType) {
    const logger = this.logger.logMethodStart(this.task.name, ctx);

    const task = await taskRepo.findFirst(id);

    if (!task) {
      logger.warn(`${user.id} trying to access task ${id} that doesn't exist`);
      throw new NotFoundError(`task ${id} not found`);
    }

    authCheck(user, task.userId);

    return task;
  }

  async create(user: User, input: TaskNew, ctx: MyContextType) {
    this.logger.logMethodStart(this.create.name, ctx, {
      data: { ...input },
    });

    return await taskRepo.create({
      ...input,
      updatedAt: new Date(),
      createdAt: new Date(),
      userId: user.id,
    });
  }

  async update(user: User, input: { id: string } & TaskUpdate, ctx: MyContextType) {
    const logger = this.logger.logMethodStart(this.update.name, ctx, {
      data: { ...input },
    });

    const task = await taskRepo.findFirst(input.id);

    if (!task) {
      logger.warn(`${user.id} trying to access task ${input.id} that doesn't exist`);
      throw new NotFoundError(`task ${input.id} not found`);
    }

    authCheck(user, task.userId);

    return taskRepo.update(input.id, {
      ...input,
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: user.id,
    });
  }

  async delete(user: User, id: string, ctx: MyContextType) {
    const logger = this.logger.logMethodStart(this.delete.name, ctx);

    const task = await taskRepo.findFirst(id);

    if (!task) {
      logger.warn(`${user.id} trying to access task ${id} that doesn't exist`);
      throw new NotFoundError(`task ${id} not found`);
    }

    authCheck(user, task.userId);

    return await taskRepo.delete(id);
  }
}
