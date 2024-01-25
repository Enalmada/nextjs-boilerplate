import { BaseEntityType } from '@/server/base/base.model';
import { type ListInput } from '@/server/base/base.service';
import { UserRole, type Task, type User, type UserInput } from '@/server/db/schema';
import { builder, type InputFieldBuilderType } from '@/server/graphql/builder';
import { OrderInputType, PaginationInputType } from '@/server/graphql/sortAndPagination';
import { TaskType } from '@/server/task/task.model';
import TaskService from '@/server/task/task.service';
import UserService, { type UserWithTasks } from '@/server/user/user.service';

// https://github.com/chimame/graphql-yoga-worker-with-pothos
export const UserType = builder.objectRef<User & { rules?: string }>('User');

builder.enumType(UserRole, {
  name: 'UserRole',
});

UserType.implement({
  interfaces: [BaseEntityType],
  fields: (t) => ({
    name: t.exposeString('name', { nullable: true }),
    email: t.exposeString('email', { nullable: true }),
    role: t.field({
      type: UserRole,
      resolve: (user: User) => user.role as unknown as UserRole,
    }),
    rules: t.expose('rules', { type: 'JSON', nullable: true }),
    tasks: t.field({
      type: [TaskType],
      resolve: async (user: UserWithTasks, args, ctx) => {
        if (user.tasks) {
          return user.tasks;
        } else {
          const input: ListInput<Task> = {
            where: { userId: user.id },
            pagination: { page: 0, pageSize: 100 },
          };
          const page = await new TaskService().list(input, ctx);
          return page.result;
        }
      },
      nullable: true,
    }),
  }),
});

builder.queryField('me', (t) =>
  t.field({
    type: UserType,
    nullable: true,
    resolve: (root, args, ctx) => {
      return new UserService().me(ctx);
    },
  })
);

// ADMIN

builder.queryField('user', (t) =>
  t.field({
    type: UserType,
    args: {
      id: t.arg.id({ required: true }),
    },
    nullable: true,
    resolve: async (_root, args, ctx) => {
      return new UserService().get(args.id, ctx);
    },
  })
);

export interface UserPage {
  hasMore: boolean;
  users: User[];
}

export const UserPageType = builder.objectRef<UserPage>('UserPage');

UserPageType.implement({
  description: 'Type used for querying paginated users',
  fields: (t) => ({
    hasMore: t.exposeBoolean('hasMore'),
    users: t.expose('users', { type: [UserType] }),
  }),
});

export const UserWhereInputType = builder.inputRef<Partial<User>>('UserWhere');

UserWhereInputType.implement({
  fields: (t) => ({
    id: t.id(),
    email: t.string(),
  }),
});

builder.queryField('usersPage', (t) =>
  t.fieldWithInput({
    type: UserPageType,
    input: {
      where: t.input.field({ type: UserWhereInputType, required: false }),
      order: t.input.field({ type: OrderInputType, required: false }),
      pagination: t.input.field({ type: PaginationInputType, required: false }),
    },
    resolve: async (_root, args, ctx) => {
      const input = {
        ...(args.input as ListInput<User>),
        with: { tasks: true },
      };
      const page = await new UserService().list(input, ctx);
      return {
        hasMore: page.hasMore,
        users: page.result,
      };
    },
  })
);

function createSharedFields(input: InputFieldBuilderType) {
  return {
    role: input.field({ type: UserRole, required: true }),
  };
}

builder.mutationField('updateUser', (t) =>
  t.fieldWithInput({
    type: UserType,
    nullable: true,
    args: {
      id: t.arg.id({ required: true }),
    },
    input: {
      ...createSharedFields(t.input),
      version: t.input.int({ required: true }),
    },
    resolve: async (_root, args, ctx) => {
      const input: UserInput = {
        ...args.input,
        updatedAt: new Date(),
      };
      return new UserService().update(args.id, input, ctx);
    },
  })
);

builder.mutationField('deleteUser', (t) =>
  t.field({
    type: UserType,
    nullable: true,
    args: {
      id: t.arg.id({ required: true }),
    },
    resolve: async (_root, args, ctx) => {
      return new UserService().delete(args.id, ctx);
    },
  })
);
