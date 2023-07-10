import { type TypePolicies } from '@apollo/client/cache/inmemory/policies';

const typePolicies: TypePolicies = {
  Query: {
    fields: {
      task: {
        read(_, { args, toReference }) {
          return toReference({
            __typename: 'Task',
            id: args?.id as string,
          });
        },
      },
    },
  },
};

export default typePolicies;
