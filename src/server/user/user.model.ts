import { BaseEntityType } from '@/server/base/base.model';
import { type ListInput } from '@/server/base/base.service';
import { UserRole, type User, type UserInput } from '@/server/db/schema';
import { builder } from '@/server/graphql/builder';
import { OrderInputType, PaginationInputType } from '@/server/graphql/sortAndPagination';
import { TaskType } from '@/server/task/task.model';
import TaskService from '@/server/task/task.service';
import UserService from '@/server/user/user.service';

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
      nullable: {
        list: true,
        items: false,
      },
      resolve: async (user: User, args, ctx) => {
        const input = {
          where: { userId: user.id },
        };
        const page = await new TaskService().list(input, ctx);
        return page.result;
      },
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
      return new UserService().get(args.id as string, ctx);
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

export interface UserWhere {
  id?: string;
  email?: string;
}

export const UserWhereInputType = builder.inputRef<UserWhere>('UserWhere');

UserWhereInputType.implement({
  fields: (t) => ({
    id: t.string(),
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
      const page = await new UserService().list(args.input as ListInput<User>, ctx);
      return {
        hasMore: page.hasMore,
        users: page.result,
      };
    },
  })
);

builder.mutationField('updateUser', (t) =>
  t.fieldWithInput({
    type: UserType,
    nullable: true,
    args: {
      id: t.arg.id({ required: true }),
    },
    input: {
      role: t.input.field({ type: UserRole, required: true }),
      version: t.input.int({ required: true }),
    },
    resolve: async (_root, args, ctx) => {
      const input: UserInput = {
        ...args.input,
        updatedAt: new Date(),
      };
      return new UserService().update(args.id as string, input, ctx);
    },
  })
);
