import TaskService from "@/server/task/task.service";
import { CurrentUser } from "@/server/utils/currentUser";
import { type User } from "@prisma/client";
import { injectable } from "tsyringe";
import { Arg, Authorized, ID, Mutation, Query, Resolver } from "type-graphql";

import { Task, TaskInput } from "./task.model";

@injectable()
@Resolver(() => Task)
export class TaskResolver {
  constructor(private readonly taskService: TaskService) {}

  @Query(() => [Task])
  @Authorized()
  tasks(@CurrentUser() user: User) {
    return this.taskService.getTasks(user);
  }

  @Query(() => Task)
  @Authorized()
  task(@CurrentUser() user: User, @Arg("id", () => ID) id: string) {
    return this.taskService.getTask(user, id);
  }

  @Mutation(() => Task)
  @Authorized()
  upsertTask(@CurrentUser() user: User, @Arg("input") data: TaskInput) {
    return this.taskService.upsertTask(user, data);
  }

  @Mutation(() => Task)
  @Authorized()
  deleteTask(@CurrentUser() user: User, @Arg("id") id: string) {
    return this.taskService.deleteTask(user, id);
  }
}
