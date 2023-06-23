import { TaskStatus } from "@prisma/client";
import { Service } from "typedi";

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

@Service()
export default class TaskService {
  getTasks(): [Task] {
    return [sampleTask];
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
