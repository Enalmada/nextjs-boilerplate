import TaskService from "@/task/task.service";
import { injectable } from "tsyringe";
import { Arg, Mutation, Query, Resolver } from "type-graphql";

import { Task, TaskInput } from "./task.model";

@injectable()
@Resolver(() => Task)
export class TaskResolver {
  constructor(private readonly taskService: TaskService) {}

  @Query(() => [Task])
  tasks() {
    return this.taskService.getTasks();
  }

  @Mutation(() => Task)
  upsertTask(@Arg("input") data: TaskInput) {
    return this.taskService.upsertTask(data);
  }

  @Mutation(() => Task)
  deleteTask(@Arg("id") id: string) {
    return this.taskService.deleteTask(id);
  }
}
