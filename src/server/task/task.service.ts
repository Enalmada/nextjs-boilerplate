import { getChildLogger, getLogger } from '@/lib/logging/log-util';
import prisma from '@/server/db/db';
import authCheck from '@/server/utils/authCheck';
import { type User } from '@prisma/client';
import { GraphQLError } from 'graphql';

import { Prisma } from '.prisma/client';

import TaskUncheckedCreateInput = Prisma.TaskUncheckedCreateInput;
import TaskUncheckedUpdateInput = Prisma.TaskUncheckedUpdateInput;

export default class TaskService {
  private readonly logger = getLogger(TaskService.name);

  tasks(user: User) {
    getChildLogger(this.logger, { method: this.tasks.name, userId: user.id });

    return prisma.task.findMany({
      where: {
        userId: user.id,
      },
    });
  }

  async task(user: User, id: string) {
    getChildLogger(this.logger, { method: this.task.name, userId: user.id, id });

    const task = await prisma.task.findFirst({
      where: {
        id,
      },
    });

    if (!task) {
      this.logger.warn(`${user.id} trying to access task ${id} that doesn't exist`);
      return null;
    }

    authCheck(user, task.userId);

    return task;
  }

  async create(user: User, input: TaskUncheckedCreateInput) {
    getChildLogger(this.logger, {
      method: this.create.name,
      userId: user.id,
      data: { ...input },
    });

    return prisma.task.create({
      data: {
        ...input,
        userId: user.id,
      },
    });
  }

  async update(user: User, input: { id: string } & TaskUncheckedUpdateInput) {
    getChildLogger(this.logger, {
      method: this.update.name,
      userId: user.id,
      data: { ...input },
    });

    const task = await prisma.task.findFirst({
      where: {
        id: input.id,
      },
    });

    if (!task) {
      this.logger.warn(`${user.id} trying to access task ${input.id} that doesn't exist`);
      throw new GraphQLError(`task ${input.id} not found`);
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

  async delete(user: User, id: string) {
    getChildLogger(this.logger, { method: this.delete.name, userId: user.id, id });

    const task = await prisma.task.findFirst({
      where: {
        id,
      },
    });

    if (!task) {
      this.logger.warn(`${user.id} trying to access task ${id} that doesn't exist`);
      throw new GraphQLError(`task ${id} not found`);
    }

    authCheck(user, task.userId);

    return prisma.task.delete({
      where: {
        id,
      },
    });
  }
}
