import { type BaseEntity } from '@/server/base/base.service';
import { builder } from '@/server/graphql/builder';

export const BaseEntityType = builder.interfaceRef<BaseEntity>('BaseEntity');

builder.interfaceType(BaseEntityType, {
  name: 'BaseEntity',
  fields: (t) => ({
    id: t.exposeID('id'),
    createdAt: t.expose('createdAt', {
      type: 'DateTime',
    }),
    updatedAt: t.expose('updatedAt', {
      type: 'DateTime',
    }),
    version: t.exposeInt('version'),
  }),
});
