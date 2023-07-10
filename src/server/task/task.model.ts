import { builder } from "@/server/graphql/builder";
import TaskService from "@/server/task/task.service";

import { TaskStatus } from ".prisma/client";

builder.enumType(TaskStatus, {
  name: "TaskStatus",
});

builder.prismaObject("Task", {
  fields: (t) => ({
    id: t.exposeID("id"),
    title: t.exposeString("title"),
    description: t.exposeString("description", { nullable: true }),
    status: t.field({
      type: TaskStatus,
      resolve: (task) => task.status as unknown as TaskStatus,
    }),
    dueDate: t.expose("dueDate", {
      nullable: true,
      type: "DateTime",
    }),
    createdAt: t.expose("createdAt", {
      type: "DateTime",
    }),
    updatedAt: t.expose("updatedAt", {
      type: "DateTime",
    }),
  }),
});

builder.queryField("task", (t) =>
  t.prismaField({
    type: "Task",
    args: {
      id: t.arg.id({ required: true }),
    },
    nullable: true,
    resolve: async (query, root, args, ctx) => {
      return new TaskService().task(ctx.currentUser, args.id as string);
    },
  })
);

builder.queryField("tasks", (t) =>
  t.prismaField({
    type: ["Task"],
    resolve: async (query, root, args, ctx) => {
      return new TaskService().tasks(ctx.currentUser);
    },
  })
);

builder.mutationField("upsertTask", (t) =>
  t.prismaFieldWithInput({
    type: "Task",
    input: {
      id: t.input.id({ required: false }),
      title: t.input.string({ required: true }),
      description: t.input.string(),
      status: t.input.field({ type: TaskStatus, required: true }),
      dueDate: t.input.field({ type: "DateTime" }),
    },
    resolve: async (query, root, args, ctx) => {
      const input = {
        ...args.input,
        id: args.input.id as string,
        userId: ctx.currentUser.id,
      };
      return new TaskService().upsertTask(ctx.currentUser, input);
    },
  })
);

builder.mutationField("deleteTask", (t) =>
  t.prismaField({
    type: "Task",
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: async (query, root, args, ctx) => {
      return new TaskService().deleteTask(ctx.currentUser, args.id);
    },
  })
);
