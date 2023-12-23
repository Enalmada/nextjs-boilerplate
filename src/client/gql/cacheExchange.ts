/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { MY_TASKS } from '@/client/gql/client-queries.gql';
import { type MyTasksQuery, type Task } from '@/client/gql/generated/graphql';
import schema from '@/client/gql/generated/schema.json';
import {
  createCacheExchange,
  type Cache,
  type CacheExchangeOptions,
} from '@enalmada/next-gql/client/urql/cacheExchange';

// Urql will console warn this for any entities that don't return id:
//   Invalid key: The GraphQL query at the field at `...` has a selection set, but no key could be generated for the data at this field.
//   You have to request `id` or `_id` fields for all selection sets or create a custom `keys` config for `TaskPage`.
//   Entities without keys will be embedded directly on the parent entity. If this is intentional, create a `keys` config for `TaskPage` that always returns null.
// Since our paginated pages don't have id, the following logic will add key of null to them.
// Warning: This will likely remove warnings that you missed returning id for something that should have one but
// going to trust that this is being considered, linted, reviewed so we can be more automated here and not manually
// whitelist every paginated page ever made.
// https://formidable.com/open-source/urql/docs/graphcache/cache-updates/#updating-many-unknown-links

const userDefinedConfig: CacheExchangeOptions = {
  schema,
  updates: {
    Mutation: {
      createTask(result: { createTask: Task }, _args: any, cache: Cache) {
        cache.updateQuery({ query: MY_TASKS }, (data: MyTasksQuery | null) => {
          if (result && data?.me?.tasks) {
            const updatedTasks = [...data.me.tasks, result.createTask];
            return { ...data, me: { ...data.me, tasks: updatedTasks } };
          }
          return data;
        });
      },
      deleteTask(_result: any, args: { id: string }, cache: Cache) {
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
};

export const cacheExchange = createCacheExchange(userDefinedConfig);
