// https://pothos-graphql.dev/docs/plugins/prisma
// https://www.prisma.io/blog/e2e-type-safety-graphql-react-3-fbV2ZVIGWg#define-a-date-scalar-type
import SchemaBuilder from '@pothos/core';
import ErrorsPlugin from '@pothos/plugin-errors';
import WithInputPlugin from '@pothos/plugin-with-input';
import { DateTimeResolver, JSONResolver, NonEmptyStringResolver } from 'graphql-scalars';

import { type MyContextType } from './yoga';

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

export interface SchemaTypes {
  Scalars: {
    DateTime: {
      Input: Date;
      Output: Date;
    };
    JSON: {
      Input: unknown;
      Output: unknown;
    };
    NonEmptyString: {
      Input: string;
      Output: string;
    };
  };
  Context: MyContextType;
}

export type TypesWithDefault = PothosSchemaTypes.ExtendDefaultTypes<SchemaTypes>;

export const builder = new SchemaBuilder<SchemaTypes>({
  plugins: [ErrorsPlugin, WithInputPlugin],
  /*
  errorOptions: {
    directResult: true,
    defaultTypes: [Error],
  },
   */
});

/*
const ErrorInterface = builder.interfaceRef<Error>('Error').implement({
  fields: (t) => ({
    message: t.exposeString('message'),
  }),
});

builder.objectType(Error, {
  name: 'BaseError',
  interfaces: [ErrorInterface],
});

builder.objectType(UnauthorizedError, {
  name: 'UnauthorizedError',
  interfaces: [ErrorInterface],
});

builder.objectType(NotFoundError, {
  name: 'NotFoundError',
  interfaces: [ErrorInterface],
});
 */

builder.addScalarType('DateTime', DateTimeResolver, {});
builder.addScalarType('JSON', JSONResolver, {});
builder.addScalarType('NonEmptyString', NonEmptyStringResolver, {});

builder.queryType({
  description: 'The query root type.',
});

builder.mutationType({
  description: 'The query mutation type.',
});
