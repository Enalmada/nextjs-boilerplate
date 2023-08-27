import { TaskStatus, type Task, type TaskInput } from '@/server/db/schema';
import { builder } from '@/server/graphql/builder';
import TaskService from '@/server/task/task.service';

// import TaskService from '@/server/task/task.service';

// https://github.com/chimame/graphql-yoga-worker-with-pothos

builder.enumType(TaskStatus, {
  name: 'TaskStatus',
});

export const TaskType = builder.objectRef<Task>('Task');

TaskType.implement({
  fields: (t) => ({
    id: t.exposeID('id'),
    title: t.expose('title', {
      type: 'NonEmptyString',
    }),
    description: t.exposeString('description', { nullable: true }),
    status: t.field({
      type: TaskStatus,
      resolve: (task: Task) => task.status as unknown as TaskStatus,
    }),
    dueDate: t.expose('dueDate', {
      nullable: true,
      type: 'DateTime',
    }),
    createdAt: t.expose('createdAt', {
      type: 'DateTime',
    }),
    updatedAt: t.expose('updatedAt', {
      type: 'DateTime',
    }),
    version: t.exposeInt('version'),
  }),
});

builder.queryField('task', (t) =>
  t.field({
    type: TaskType,
    args: {
      id: t.arg.id({ required: true }),
    },
    nullable: true,
    resolve: async (root, args, ctx) => {
      return new TaskService().task(ctx.currentUser, args.id as string, ctx);
    },
  })
);

builder.queryField('tasks', (t) =>
  t.field({
    type: [TaskType],
    resolve: async (root, args, ctx) => {
      if (!ctx.currentUser) {
        return [];
      }

      return new TaskService().tasks(ctx.currentUser, ctx);
    },
  })
);

builder.mutationField('createTask', (t) =>
  t.fieldWithInput({
    type: TaskType,
    input: {
      title: t.input.field({ type: 'NonEmptyString', required: true }),
      description: t.input.string(),
      status: t.input.field({ type: TaskStatus, required: true }),
      dueDate: t.input.field({ type: 'DateTime' }),
    },
    // errors: {},
    resolve: async (root, args, ctx) => {
      const input: TaskInput = {
        ...args.input,
        userId: ctx.currentUser.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      return new TaskService().create(ctx.currentUser, input, ctx);
    },
  })
);

builder.mutationField('updateTask', (t) =>
  t.fieldWithInput({
    type: TaskType,
    nullable: true,
    args: {
      id: t.arg.id({ required: true }),
    },
    input: {
      title: t.input.field({ type: 'NonEmptyString', required: true }),
      description: t.input.string(),
      status: t.input.field({ type: TaskStatus, required: true }),
      dueDate: t.input.field({ type: 'DateTime' }),
      version: t.input.int({ required: true }),
    },
    resolve: async (root, args, ctx) => {
      const input: TaskInput = {
        ...args.input,
        userId: ctx.currentUser.id,
        updatedAt: new Date(),
      };
      return new TaskService().update(ctx.currentUser, args.id as string, input, ctx);
    },
  })
);

builder.mutationField('deleteTask', (t) =>
  t.field({
    type: TaskType,
    nullable: true,
    args: {
      id: t.arg.id({ required: true }),
    },
    resolve: async (root, args, ctx) => {
      return new TaskService().delete(ctx.currentUser, args.id as string, ctx);
    },
  })
);
