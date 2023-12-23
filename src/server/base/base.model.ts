import { type BaseEntity } from '@/server/base/base.service';
import { builder } from '@/server/graphql/builder';
import { UserType } from '@/server/user/user.model';
import UserService from '@/server/user/user.service';

export const BaseEntityType = builder.interfaceRef<BaseEntity>('BaseEntity');

builder.interfaceType(BaseEntityType, {
  name: 'BaseEntity',
  fields: (t) => ({
    id: t.exposeID('id'),
    createdAt: t.expose('createdAt', {
      type: 'DateTime',
    }),
    createdBy: t.field({
      type: UserType,
      nullable: true,
      resolve: (root, args, ctx) => {
        return new UserService().get(root.createdById as string, ctx);
      },
    }),
    updatedAt: t.expose('updatedAt', {
      type: 'DateTime',
      nullable: true,
    }),
    updatedBy: t.field({
      type: UserType,
      nullable: true,
      resolve: (root, args, ctx) => {
        return new UserService().get(root.updatedById as string, ctx);
      },
    }),
    version: t.exposeInt('version'),
  }),
});
