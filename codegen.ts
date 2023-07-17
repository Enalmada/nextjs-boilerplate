import { type CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: './src/server/graphql/schema.graphql',
  documents: ['src/server/graphql/schema.graphql', 'src/client/queries-mutations.ts'],
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    './src/client/gql/': {
      preset: 'client-preset',
      config: {
        scalars: {
          DateTime: 'Date',
          NonEmptyString: 'string',
        },
      },
    },
  },
  // hooks: { afterAllFileWrite: ['prettier --write'] },
};

export default config;
