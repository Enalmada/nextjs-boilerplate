import { PrismaService } from "@/backend/prisma.service";
import { TaskStatus } from "@prisma/client";
import { injectable } from "tsyringe";

import { type Task, type TaskInput } from "./task.model";

const sampleTask: Task = {
  id: "1",
  title: "title",
  description: "description",
  status: TaskStatus.ACTIVE,
  dueDate: undefined,
  createdAt: new Date(),
  updatedAt: new Date(),
};

@injectable()
export default class TaskService {
  constructor(private prisma: PrismaService) {}

  getTasks() {
    return this.prisma.task.findMany({
      where: {
        userId: "12222222222222222222222222222222",
      },
    });
  }

  upsertTask(input: TaskInput): Task {
    console.log("input: " + JSON.stringify(input));

    return {
      ...sampleTask,
      title: input.title,
      description: input.description,
      status: input.status,
      dueDate: input.dueDate,
    };
  }

  deleteTask(id: string): Task {
    return sampleTask;
  }
}
