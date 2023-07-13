// https://pothos-graphql.dev/docs/plugins/prisma
// https://www.prisma.io/blog/e2e-type-safety-graphql-react-3-fbV2ZVIGWg#define-a-date-scalar-type
import SchemaBuilder from '@pothos/core';
import PrismaPlugin from '@pothos/plugin-prisma';
import type PrismaTypes from '@pothos/plugin-prisma/generated';
import WithInputPlugin from '@pothos/plugin-with-input';
import { PrismaClient } from '@prisma/client';
import { DateTimeResolver } from 'graphql-scalars';

import { type MyContextType } from './yoga';

const prisma = new PrismaClient({});

// Complexity taken care of by armor. Use here if not there
// https://escape.tech/graphql-armor/
// https://pothos-graphql.dev/docs/plugins/complexity
/*
const complexity = {
  defaultComplexity: 1,
  defaultListMultiplier: 10,
  limit: {
    complexity: 500,
    depth: 10,
    breadth: 50,
  },
};
 */

export const builder = new SchemaBuilder<{
  PrismaTypes: PrismaTypes;
  Scalars: {
    DateTime: {
      Input: Date;
      Output: Date;
    };
  };
  Context: MyContextType;
}>({
  plugins: [PrismaPlugin, WithInputPlugin],
  prisma: {
    client: prisma,
    // defaults to false, uses /// comments from prisma schema as descriptions
    // for object types, relations and exposed fields.
    // descriptions can be omitted by setting description to false
    exposeDescriptions: false,
    // use where clause from prismaRelatedConnection for totalCount (will true by default in next major version)
    filterConnectionTotalCount: true,
  },
});

builder.addScalarType('DateTime', DateTimeResolver, {});

builder.queryType({
  description: 'The query root type.',
});

builder.mutationType({
  description: 'The query mutation type.',
});
