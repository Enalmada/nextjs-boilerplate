import { type User } from '@/server/db/schema';
import { initializeBuilder } from '@enalmada/next-gql/server';
import SchemaBuilder from '@pothos/core';
import WithInputPlugin from '@pothos/plugin-with-input';

export interface MyContextType {
  currentUser: User;
}

export interface DefaultSchemaTypes {
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

export const builder = new SchemaBuilder<DefaultSchemaTypes>({
  plugins: [WithInputPlugin],
});

initializeBuilder(builder);
