/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { MY_TASKS, type TASK } from "@/client/gql/client-queries.gql";
import schema from "@/client/gql/generated/schema.json";
import {
	type Cache,
	type CacheExchangeOptions,
	createCacheExchange,
} from "@enalmada/next-gql/client/urql/cacheExchange";
import type { ResultOf } from "gql.tada";

// Urql will console warn this for any entities that don't return id:
//   Invalid key: The GraphQL query at the field at `...` has a selection set, but no key could be generated for the data at this field.
//   You have to request `id` or `_id` fields for all selection sets or create a custom `keys` config for `TaskPage`.
//   Entities without keys will be embedded directly on the parent entity. If this is intentional, create a `keys` config for `TaskPage` that always returns null.
// Since our paginated pages don't have id, the following logic will add key of null to them.
// Warning: This will likely remove warnings that you missed returning id for something that should have one but
// going to trust that this is being considered, linted, reviewed so we can be more automated here and not manually
// whitelist every paginated page ever made.
// https://formidable.com/open-source/urql/docs/graphcache/cache-updates/#updating-many-unknown-links

type MyTasksQuery = ResultOf<typeof MY_TASKS>;
// Assuming Task is a type from your schema that matches the TaskParts fragment
type Task = ResultOf<typeof TASK>;

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
						const updatedTasks = data.me.tasks.filter(
							(task) => task.id !== args.id,
						);
						return { ...data, me: { ...data.me, tasks: updatedTasks } };
					}
					return data;
				});
			},
		},
	},
};

export const cacheExchange = createCacheExchange(userDefinedConfig);
