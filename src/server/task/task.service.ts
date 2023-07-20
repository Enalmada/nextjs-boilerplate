import Logger from '@/lib/logging/log-util';
import prisma from '@/server/db/db';
import { NotAuthorizedError, NotFoundError } from '@/server/graphql/errors';
import { type MyContextType } from '@/server/graphql/yoga';
import authCheck from '@/server/utils/authCheck';
import { type User } from '@prisma/client';

import { Prisma } from '.prisma/client';

import TaskUncheckedCreateInput = Prisma.TaskUncheckedCreateInput;
import TaskUncheckedUpdateInput = Prisma.TaskUncheckedUpdateInput;

export default class TaskService {
  private readonly logger = new Logger(TaskService.name);

  tasks(user: User, ctx: MyContextType) {
    this.logger.logMethodStart(this.tasks.name, ctx);

    if (!user) {
      throw new NotAuthorizedError(`user required to complete this operation`);
    }

    return prisma.task.findMany({
      where: {
        userId: user.id,
      },
    });
  }

  async task(user: User, id: string, ctx: MyContextType) {
    const logger = this.logger.logMethodStart(this.task.name, ctx);

    const task = await prisma.task.findFirst({
      where: {
        id,
      },
    });

    if (!task) {
      logger.warn(`${user.id} trying to access task ${id} that doesn't exist`);
      throw new NotFoundError(`task ${id} not found`);
    }

    authCheck(user, task.userId);

    return task;
  }

  async create(user: User, input: TaskUncheckedCreateInput, ctx: MyContextType) {
    this.logger.logMethodStart(this.create.name, ctx, {
      data: { ...input },
    });

    return prisma.task.create({
      data: {
        ...input,
        userId: user.id,
      },
    });
  }

  async update(user: User, input: { id: string } & TaskUncheckedUpdateInput, ctx: MyContextType) {
    const logger = this.logger.logMethodStart(this.update.name, ctx, {
      data: { ...input },
    });

    const task = await prisma.task.findFirst({
      where: {
        id: input.id,
      },
    });

    if (!task) {
      logger.warn(`${user.id} trying to access task ${input.id} that doesn't exist`);
      throw new NotFoundError(`task ${input.id} not found`);
    }

    authCheck(user, task.userId);

    return prisma.task.update({
      where: {
        id: input.id,
      },
      data: {
        ...input,
      },
    });
  }

  async delete(user: User, id: string, ctx: MyContextType) {
    const logger = this.logger.logMethodStart(this.delete.name, ctx);

    const task = await prisma.task.findFirst({
      where: {
        id,
      },
    });

    if (!task) {
      logger.warn(`${user.id} trying to access task ${id} that doesn't exist`);
      throw new NotFoundError(`task ${id} not found`);
    }

    authCheck(user, task.userId);

    return prisma.task.delete({
      where: {
        id,
      },
    });
  }
}
