import { PrismaService } from "@/server/db/prisma.service";
import authCheck from "@/server/utils/authCheck";
import { type User } from "@prisma/client";
import { injectable } from "tsyringe";

import { type FindTaskInput, type TaskInput } from "./task.model";

@injectable()
export default class TaskService {
  constructor(private prisma: PrismaService) {}

  getTasks(user: User) {
    return this.prisma.task.findMany({
      where: {
        userId: user.id,
      },
    });
  }

  getTask(user: User, input: FindTaskInput) {
    return this.prisma.task.findFirstOrThrow({
      where: {
        id: input.id,
        userId: user.id,
      },
    });
  }

  async upsertTask(user: User, input: TaskInput) {
    if (input.id) {
      const task = await this.prisma.task.findFirst({
        where: {
          id: input.id,
        },
      });

      if (!task) {
        throw Error("not found");
      }

      authCheck(user, task.userId);

      return this.prisma.task.update({
        where: {
          id: input.id,
        },
        data: {
          ...input,
        },
      });
    }

    return this.prisma.task.create({
      data: {
        ...input,
        userId: user.id,
      },
    });
  }

  async deleteTask(user: User, id: string) {
    const task = await this.prisma.task.findFirst({
      where: {
        id,
      },
    });

    if (!task) {
      throw Error("not found");
    }

    authCheck(user, task.userId);

    return this.prisma.task.delete({
      where: {
        id,
      },
    });
  }
}
