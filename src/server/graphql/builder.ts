import { type MyContextType } from '@/server/graphql/server';
import { initializeBuilder, type DefaultScalars } from '@enalmada/next-gql/server';
import SchemaBuilder from '@pothos/core';
import SubGraphPlugin from '@pothos/plugin-sub-graph';
import WithInputPlugin from '@pothos/plugin-with-input';

export enum SubGraph {
  'PUBLIC' = 'PUBLIC',
  'PRIVATE' = 'PRIVATE',
}

type DefaultUserSchemaTypes = DefaultScalars & { Context: MyContextType } & {
  SubGraphs: SubGraph.PUBLIC | SubGraph.PRIVATE;
};

// TODO move SchemaBuilder and options to next-gql.  They have sideEffects that require them in application
// but perhaps adding sideEffects to their package.json could help.
export const builder = new SchemaBuilder<DefaultUserSchemaTypes>({
  plugins: [WithInputPlugin, SubGraphPlugin],
  subGraphs: {
    defaultForTypes: [SubGraph.PUBLIC],
    fieldsInheritFromTypes: true,
  },
});

initializeBuilder(builder);
