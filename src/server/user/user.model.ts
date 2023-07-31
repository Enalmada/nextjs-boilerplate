import { type DB } from '@/server/db/types';
import { builder } from '@/server/graphql/builder';
import { type AllSelection } from 'kysely/dist/cjs/parser/select-parser';

// https://github.com/chimame/graphql-yoga-worker-with-pothos
export const UserType = builder.objectRef<AllSelection<DB, 'user'>>('User');

UserType.implement({
  fields: (t) => ({
    id: t.exposeID('id'),
    name: t.exposeString('name', { nullable: true }),
    email: t.exposeString('email', { nullable: true }),
  }),
});
