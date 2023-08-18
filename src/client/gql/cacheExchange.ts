// https://formidable.com/open-source/urql/docs/graphcache/cache-updates/#updating-many-unknown-links
import { type Task } from '@/client/gql/generated/graphql';
import schema from '@/client/gql/generated/schema.json';
import { TASKS } from '@/client/gql/queries-mutations';
import { cacheExchange } from '@urql/exchange-graphcache';

export default cacheExchange({
  schema,
  updates: {
    Mutation: {
      createTask(result, _args, cache) {
        cache.updateQuery({ query: TASKS }, (data) => {
          result && data?.tasks.push(result.createTask as Task);
          return data;
        });
      },
      deleteTask(_result, args, cache) {
        cache.updateQuery({ query: TASKS }, (data) => {
          if (data) {
            data.tasks = data.tasks.filter((task) => task.id !== args.id);
          }
          return data;
        });
      },
    },
  },
});
