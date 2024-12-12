import { serverEnv } from "@/env.mjs";
import Logger from "@/lib/logging/log-util";
import { builder } from "@/server/graphql/builder";

import "./sortAndPagination";
import "@/server/graphql/subscriptions/notification";
import "@/server/admin/admin.model";
import "@/server/user/user.model";
/* clone-code ENTITY_HOOK
{
  "toPlacement": "below",
  "replacements": [
    { "find": "task", "replace": "<%= h.changeCase.camelCase(name) %>" }
  ]
}
*/
import "@/server/task/task.model";
import { writeFileSync } from "node:fs";
import path from "node:path";
import {
	getIntrospectionQuery,
	graphql,
	lexicographicSortSchema,
	printSchema,
} from "graphql";

/* clone-code ENTITY_HOOK end */

export const schema = builder.toSchema({});

const logger = new Logger("schema");
try {
	const schemaAsString = printSchema(lexicographicSortSchema(schema));
	const filePath = path.join(
		__dirname,
		"../../../../../src/client/gql/generated/schema.graphql",
	);
	writeFileSync(filePath, schemaAsString);

	// Generate and save schema.json
	void graphql({
		schema,
		source: getIntrospectionQuery(),
	}).then((result) => {
		if (result.data) {
			const jsonFilePath = path.join(
				__dirname,
				"../../../../../src/client/gql/generated/schema.json",
			);
			writeFileSync(jsonFilePath, JSON.stringify(result.data, null, 2));
			logger.info("Successfully wrote schema files");
		} else {
			logger.error("Failed to generate schema.json:", result.errors);
		}
	});
} catch (error) {
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	logger.error("Error writing schema file:", error);
}
