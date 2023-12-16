import createCodegenConfig from '@enalmada/next-gql-codegen';

const config = createCodegenConfig({
  schema: [
    {
      'http://localhost:3000/api/graphql': {
        headers: {
          'x-graphql-csrf': 'true',
        },
      },
    },
    {
      'http://localhost:3000/api/admin/graphql': {
        headers: {
          'x-graphql-csrf': 'true',
        },
      },
    },
  ],
});

export default config;
