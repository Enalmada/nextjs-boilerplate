import { getChildLogger, getLogger } from '@/lib/logging/log-util';
import prisma from '@/server/db/db';
import authCheck from '@/server/utils/authCheck';
import { type User } from '@prisma/client';

import { Prisma } from '.prisma/client';

import TaskUncheckedCreateInput = Prisma.TaskUncheckedCreateInput;

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

  task(user: User, id: string) {
    getChildLogger(this.logger, { method: this.task.name, userId: user.id, id });

    return prisma.task.findFirstOrThrow({
      where: {
        id,
        userId: user.id,
      },
    });
  }

  async upsertTask(user: User, input: TaskUncheckedCreateInput) {
    getChildLogger(this.logger, {
      method: this.upsertTask.name,
      userId: user.id,
      data: { ...input },
    });

    if (input.id) {
      const task = await prisma.task.findFirst({
        where: {
          id: input.id,
        },
      });

      if (!task) {
        throw Error('not found');
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

    return prisma.task.create({
      data: {
        ...input,
        userId: user.id,
      },
    });
  }

  async deleteTask(user: User, id: string) {
    getChildLogger(this.logger, { method: this.deleteTask.name, userId: user.id, id });

    const task = await prisma.task.findFirst({
      where: {
        id,
      },
    });

    if (!task) {
      throw Error('not found');
    }

    authCheck(user, task.userId);

    return prisma.task.delete({
      where: {
        id,
      },
    });
  }
}
