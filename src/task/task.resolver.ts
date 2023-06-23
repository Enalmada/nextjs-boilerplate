import TaskService from "@/task/task.service";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Service } from "typedi";

import { Task, TaskInput } from "./task.model";

@Service()
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
