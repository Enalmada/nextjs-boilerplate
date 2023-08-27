import { type CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'http://localhost:3000/api/graphql',
  documents: [
    'src/server/graphql/(builder|schema).ts',
    'src/server/**/*.model.ts',
    'src/client/gql/queries-mutations.ts',
  ],
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    './src/client/gql/generated/schema.graphql': {
      plugins: ['schema-ast'],
    },
    './src/client/gql/generated/': {
      preset: 'client-preset',
      config: {
        scalars: {
          DateTime: 'Date',
          NonEmptyString: 'string',
        },
      },
    },
  },
  // was triggering rebuild of Cloudflare watch
  // hooks: { afterAllFileWrite: ['prettier --write'] },
};

export default config;
