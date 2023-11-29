import { UserRole, type User } from '@/server/db/schema';
import { builder } from '@/server/graphql/builder';
import { TaskType } from '@/server/task/task.model';
import TaskService, { type TasksInput } from '@/server/task/task.service';
import UserService from '@/server/user/user.service';

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

builder.queryField('users', (t) =>
  t.field({
    type: [UserType],
    nullable: true,
    resolve: (root, args, ctx) => {
      return new UserService().users(ctx.currentUser, ctx);
    },
  })
);
