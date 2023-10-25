import { type User } from '@/server/db/schema';
import { initializeBuilder, type DefaultScalars } from '@enalmada/next-gql/server';
import SchemaBuilder from '@pothos/core';
import WithInputPlugin from '@pothos/plugin-with-input';

export interface MyContextType {
  currentUser: User;
}

type DefaultUserSchemaTypes = DefaultScalars & { Context: MyContextType };

// TODO move SchemaBuilder and options to next-gql.  They have sideEffects that require them in application
// but perhaps adding sideEffects to their package.json could help.
export const builder = new SchemaBuilder<DefaultUserSchemaTypes>({ plugins: [WithInputPlugin] });

initializeBuilder(builder);
