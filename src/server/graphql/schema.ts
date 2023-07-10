import { env } from "@/env.mjs";

import { builder } from "./builder";

import "@/server/task/task.model";
import "@/server/user/user.model";

import { getLogger } from "@/logging/log-util";

const logger = getLogger("schema");

export const schema = builder.toSchema({});

// On local, write a new schema file
if (env.APP_ENV === "local") {
  try {
    const fs = await import("fs/promises");
    const path = await import("path");
    const graphql = await import("graphql");
    const schemaAsString = graphql.printSchema(graphql.lexicographicSortSchema(schema));
    const logger = getLogger("schema");
    const filePath = path.join(__dirname, "../../../../src/server/graphql/schema.graphql");
    await fs.writeFile(filePath, schemaAsString);
    logger.trace(`Schema file written to: ${filePath}`);
  } catch (error) {
    logger.error("Error writing schema file:", error);
  }
} else {
  logger.debug("Skipping file writing in non-local environment.");
}
