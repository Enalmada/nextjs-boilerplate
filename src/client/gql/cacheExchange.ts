// https://formidable.com/open-source/urql/docs/graphcache/cache-updates/#updating-many-unknown-links
import { type MyTasksQuery, type Task } from '@/client/gql/generated/graphql';
import schema from '@/client/gql/generated/schema.json';
import { MY_TASKS } from '@/client/gql/queries-mutations';
import { cacheExchange } from '@urql/exchange-graphcache';

export default cacheExchange({
  schema,
  updates: {
    Mutation: {
      createTask(result, _args, cache) {
        cache.updateQuery({ query: MY_TASKS }, (data: MyTasksQuery | null) => {
          result && data?.me?.tasks?.push(result.createTask as Task);
          return data;
        });
      },
      deleteTask(_result, args, cache) {
        cache.updateQuery({ query: MY_TASKS }, (data: MyTasksQuery | null) => {
          if (data?.me?.tasks) {
            data.me.tasks = data?.me?.tasks.filter((task) => task.id !== args.id);
          }
          return data;
        });
      },
    },
  },
});
