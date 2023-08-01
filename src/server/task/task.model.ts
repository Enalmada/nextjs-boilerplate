import { TaskStatus, type DB } from '@/server/db/types';
import { builder } from '@/server/graphql/builder';
import TaskService from '@/server/task/task.service';
import { type AllSelection } from 'kysely/dist/cjs/parser/select-parser';

// https://github.com/chimame/graphql-yoga-worker-with-pothos

builder.enumType(TaskStatus, {
  name: 'TaskStatus',
});

export const TaskType = builder.objectRef<AllSelection<DB, 'task'>>('Task');

TaskType.implement({
  fields: (t) => ({
    id: t.exposeID('id'),
    title: t.expose('title', {
      type: 'NonEmptyString',
    }),
    description: t.exposeString('description', { nullable: true }),
    status: t.field({
      type: TaskStatus,
      resolve: (task) => task.status as unknown as TaskStatus,
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
  }),
});

builder.queryField('task', (t) =>
  t.field({
    type: TaskType,
    args: {
      id: t.arg.id({ required: true }),
    },
    /*
    errors: {
      directResult: true,
      types: [NotFoundError, UnauthorizedError],
    },
     */
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

      return await new TaskService().tasks(ctx.currentUser, ctx);
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
      const input = {
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

    input: {
      id: t.input.id({ required: false }),
      title: t.input.field({ type: 'NonEmptyString', required: true }),
      description: t.input.string(),
      status: t.input.field({ type: TaskStatus, required: true }),
      dueDate: t.input.field({ type: 'DateTime' }),
    },
    /*
    errors: {
      types: [NotFoundError, UnauthorizedError],
    },
     */
    resolve: async (root, args, ctx) => {
      const input = {
        ...args.input,
        id: args.input.id as string,
        userId: ctx.currentUser.id,
        updatedAt: new Date(),
      };
      return new TaskService().update(ctx.currentUser, input, ctx);
    },
  })
);

builder.mutationField('deleteTask', (t) =>
  t.field({
    type: TaskType,
    nullable: true,
    args: {
      id: t.arg.string({ required: true }),
    },
    /*
    errors: {
      types: [NotFoundError, UnauthorizedError],
    },
     */
    resolve: async (root, args, ctx) => {
      return new TaskService().delete(ctx.currentUser, args.id, ctx);
    },
  })
);
