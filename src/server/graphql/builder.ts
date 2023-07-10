// https://pothos-graphql.dev/docs/plugins/prisma
// https://www.prisma.io/blog/e2e-type-safety-graphql-react-3-fbV2ZVIGWg#define-a-date-scalar-type
import { type MyContextType } from '@/app/api/graphql/route';
import SchemaBuilder from '@pothos/core';
import ComplexityPlugin from '@pothos/plugin-complexity';
import PrismaPlugin from '@pothos/plugin-prisma';
// This is the default location for the generator, but this can be
// customized as described above.
// Using a type only import will help avoid issues with undeclared
// exports in esm mode
import type PrismaTypes from '@pothos/plugin-prisma/generated';
import WithInputPlugin from '@pothos/plugin-with-input';
import { PrismaClient } from '@prisma/client';
import { DateTimeResolver } from 'graphql-scalars';

const prisma = new PrismaClient({});

// https://pothos-graphql.dev/docs/plugins/complexity
const complexity = {
  defaultComplexity: 1,
  defaultListMultiplier: 10,
  limit: {
    complexity: 500,
    depth: 10,
    breadth: 50,
  },
};

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
  plugins: [PrismaPlugin, ComplexityPlugin, WithInputPlugin],
  complexity,
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
