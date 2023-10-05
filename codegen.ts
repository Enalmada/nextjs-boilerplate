import { type CodegenConfig } from '@graphql-codegen/cli';
import { addTypenameSelectionDocumentTransform } from '@graphql-codegen/client-preset';

const config: CodegenConfig = {
  schema: [
    {
      'http://localhost:3000/api/graphql': {
        headers: {
          'x-graphql-csrf': 'true',
        },
      },
    },
  ],
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
      preset: 'client',
      presetConfig: {
        fragmentMasking: false,
        // { unmaskFunctionName: 'getFragmentData' },
        // persistedDocuments: {
        //  // https://github.com/dotansimha/graphql-code-generator/pull/9353
        //  hashAlgorithm: 'sha256',
        // },
      },
      documentTransforms: [addTypenameSelectionDocumentTransform],
      config: {
        scalars: {
          DateTime: 'Date',
          NonEmptyString: 'string',
        },
      },
    },
    './src/client/gql/generated/schema.json': {
      plugins: ['urql-introspection'],
    },
  },
  // was triggering rebuild of Cloudflare watch
  // hooks: { afterAllFileWrite: ['prettier --write'] },
};

export default config;
