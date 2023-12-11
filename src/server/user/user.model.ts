import { UserRole, type User } from '@/server/db/schema';
import { builder } from '@/server/graphql/builder';
import { OrderInputType, PaginationInputType } from '@/server/graphql/sortAndPagination';
import { TaskType } from '@/server/task/task.model';
import TaskService, { type TasksInput } from '@/server/task/task.service';
import UserService, { type UsersInput } from '@/server/user/user.service';

// https://github.com/chimame/graphql-yoga-worker-with-pothos
export const UserType = builder.objectRef<User & { rules?: string }>('User');

builder.enumType(UserRole, {
  name: 'UserRole',
});

UserType.implement({
  fields: (t) => ({
    id: t.exposeID('id'),
    name: t.exposeString('name', { nullable: true }),
    email: t.exposeString('email', { nullable: true }),
    role: t.field({
      type: UserRole,
      resolve: (user: User) => user.role as unknown as UserRole,
    }),
    version: t.exposeInt('version'),
    rules: t.expose('rules', { type: 'JSON', nullable: true }),
    createdAt: t.field({ type: 'DateTime', resolve: (user: User) => user.createdAt }),
    updatedAt: t.field({ type: 'DateTime', resolve: (user: User) => user.createdAt }),
    tasks: t.field({
      type: [TaskType],
      nullable: {
        list: true,
        items: false,
      },
      resolve: async (user: User, args, ctx) => {
        const input: TasksInput = {
          where: { userId: user.id },
        };
        const page = await new TaskService().tasks(input, ctx);
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
      const page = await new UserService().users(args.input as UsersInput, ctx);
      return {
        hasMore: page.hasMore,
        users: page.result,
      };
    },
  })
);
