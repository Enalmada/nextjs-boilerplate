import { type User } from '@/server/db/schema';
import { builder } from '@/server/graphql/builder';

// https://github.com/chimame/graphql-yoga-worker-with-pothos
export const UserType = builder.objectRef<User>('User');

UserType.implement({
  fields: (t) => ({
    id: t.exposeID('id'),
    name: t.exposeString('name', { nullable: true }),
    email: t.exposeString('email', { nullable: true }),
    version: t.exposeInt('version'),
  }),
});
