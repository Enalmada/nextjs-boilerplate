// https://formidable.com/open-source/urql/docs/graphcache/cache-updates/#updating-many-unknown-links
import { type MyTasksQuery, type Task } from '@/client/gql/generated/graphql';
import schema from '@/client/gql/generated/schema.json';
import { MY_TASKS } from '@/client/gql/queries-mutations';
import { cacheExchange, type Data } from '@urql/exchange-graphcache';

// Urql will console warn this for any entities that don't return id:
//   Invalid key: The GraphQL query at the field at `...` has a selection set, but no key could be generated for the data at this field.
//   You have to request `id` or `_id` fields for all selection sets or create a custom `keys` config for `TaskPage`.
//   Entities without keys will be embedded directly on the parent entity. If this is intentional, create a `keys` config for `TaskPage` that always returns null.
// Since our paginated pages don't have id, the following logic will add key of null to them.
// Warning: This will likely remove warnings that you missed returning id for something that should have one but
// going to trust that this is being considered, linted, reviewed so we can be more automated here and not manually
// whitelist every paginated page ever made.

const typeNames = schema.__schema.types
  .filter((type) => type.kind === 'OBJECT' && !['Query', 'Mutation'].includes(type.name))
  .map((type) => type.name);

const keys = typeNames.reduce<Record<string, (data: Data) => string | null>>((acc, typeName) => {
  if (
    !schema.__schema.types
      .find((type) => type.name === typeName)
      ?.fields?.some((field) => field.name === 'id' || field.name === '_id')
  ) {
    acc[typeName] = () => null;
  }
  return acc;
}, {});

// Cache Exchange with the updated keys and existing updates
export default cacheExchange({
  schema,
  keys,
  updates: {
    Mutation: {
      createTask(result, _args, cache) {
        cache.updateQuery({ query: MY_TASKS }, (data: MyTasksQuery | null) => {
          if (result && data?.me?.tasks) {
            const updatedTasks = [...data.me.tasks, result.createTask as Task];
            return { ...data, me: { ...data.me, tasks: updatedTasks } };
          }
          return data;
        });
      },
      deleteTask(_result, args, cache) {
        cache.updateQuery({ query: MY_TASKS }, (data: MyTasksQuery | null) => {
          if (data?.me?.tasks) {
            const updatedTasks = data.me.tasks.filter((task) => task.id !== args.id);
            return { ...data, me: { ...data.me, tasks: updatedTasks } };
          }
          return data;
        });
      },
    },
  },
});
