/* clone-code ENTITY_HOOK
{
  "toFile": "src/server/<%= h.changeCase.camelCase(name) %>/<%= h.changeCase.camelCase(name) %>.model.ts",
  "replacements": [
    { "find": "Task", "replace": "<%= h.changeCase.pascalCase(name) %>" },
    { "find": "task", "replace": "<%= h.changeCase.camelCase(name) %>" },
    { "find": "TASK", "replace": "<%= h.changeCase.constantCase(name) %>" }
  ]
}
*/
import { BaseEntityType } from '@/server/base/base.model';
import { type ListInput } from '@/server/base/base.service';
import { TaskStatus, type Task, type TaskInput } from '@/server/db/schema';
import { builder } from '@/server/graphql/builder';
import TaskService, { type TaskWithUser } from '@/server/task/task.service';
import { UserType } from '@/server/user/user.model';

import { OrderInputType, PaginationInputType } from '../graphql/sortAndPagination';

// https://github.com/chimame/graphql-yoga-worker-with-pothos

builder.enumType(TaskStatus, {
  name: 'TaskStatus',
});

export const TaskType = builder.objectRef<Task>('Task');

TaskType.implement({
  interfaces: [BaseEntityType],
  fields: (t) => ({
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
    user: t.field({
      type: UserType,
      resolve: (task: TaskWithUser) => task.user,
      nullable: true,
    }),
  }),
});

builder.queryField('task', (t) =>
  t.field({
    type: TaskType,
    args: {
      id: t.arg.id({ required: true }),
    },
    nullable: true,
    resolve: async (_root, args, ctx) => {
      return new TaskService().get(args.id, ctx);
    },
  })
);

export interface TaskPage {
  hasMore: boolean;
  tasks: Task[];
}

export const TaskPageType = builder.objectRef<TaskPage>('TaskPage');

TaskPageType.implement({
  description: 'Type used for querying paginated tasks',
  fields: (t) => ({
    hasMore: t.exposeBoolean('hasMore'),
    tasks: t.expose('tasks', { type: [TaskType] }),
  }),
});

export const TaskWhereInputType = builder.inputRef<Partial<Task>>('TaskWhere');

TaskWhereInputType.implement({
  fields: (t) => ({
    id: t.id(),
    title: t.string(),
    userId: t.id(),
  }),
});

builder.queryField('tasksPage', (t) =>
  t.fieldWithInput({
    type: TaskPageType,
    input: {
      where: t.input.field({ type: TaskWhereInputType, required: false }),
      order: t.input.field({ type: OrderInputType, required: false }),
      pagination: t.input.field({ type: PaginationInputType, required: false }),
    },
    resolve: async (_root, args, ctx) => {
      const input = {
        ...(args.input as ListInput<Task>),
        with: { user: true },
      };
      const page = await new TaskService().list(input, ctx);
      return {
        hasMore: page.hasMore,
        tasks: page.result,
      };
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
    resolve: async (_root, args, ctx) => {
      const input: TaskInput = {
        ...args.input,
        userId: ctx.currentUser!.id,
        createdAt: new Date(),
        createdById: ctx.currentUser!.id,
      };
      return new TaskService().create(input, ctx);
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
    resolve: async (_root, args, ctx) => {
      const input: TaskInput = {
        ...args.input,
        userId: ctx.currentUser!.id,
        updatedAt: new Date(),
        updatedById: ctx.currentUser!.id,
      };
      return new TaskService().update(args.id, input, ctx);
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
    resolve: async (_root, args, ctx) => {
      return new TaskService().delete(args.id, ctx);
    },
  })
);
