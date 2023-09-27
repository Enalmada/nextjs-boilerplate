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
          if (result && data?.me?.tasks) {
            // Instead of pushing to the existing array, create a new array
            const updatedTasks = [...data.me.tasks, result.createTask as Task];
            return { ...data, me: { ...data.me, tasks: updatedTasks } };
          }
          return data;
        });
      },
      deleteTask(_result, args, cache) {
        cache.updateQuery({ query: MY_TASKS }, (data: MyTasksQuery | null) => {
          if (data?.me?.tasks) {
            // Instead of filtering the existing array, create a new array
            const updatedTasks = data.me.tasks.filter((task) => task.id !== args.id);
            return { ...data, me: { ...data.me, tasks: updatedTasks } };
          }
          return data;
        });
      },
    },
  },
});
