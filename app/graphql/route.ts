import "reflect-metadata";

import { type NextRequest } from "next/server";
import { TaskResolver } from "@/task/task.resolver";
import { UserResolver } from "@/user/user.resolver";
import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { container } from "tsyringe";
import { buildSchema } from "type-graphql";

const schema = await buildSchema({
  resolvers: [UserResolver, TaskResolver],
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument,@typescript-eslint/no-unsafe-return
  container: { get: (cls) => container.resolve(cls) },
});

const server = new ApolloServer({
  schema,
});

// eslint-disable-next-line @typescript-eslint/require-await
const handler = startServerAndCreateNextHandler<NextRequest>(server, {
  // eslint-disable-next-line @typescript-eslint/require-await
  context: async (req) => ({ req }),
});

export async function GET(request: NextRequest) {
  return handler(request);
}

export async function POST(request: NextRequest) {
  return handler(request);
}
