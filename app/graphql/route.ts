import "reflect-metadata";

import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { type NextRequest } from "next/server";
import { buildSchema } from "type-graphql";
import { Container } from "typedi";

import { UserResolver } from "@/user/user.resolver";

const schema = await buildSchema({
    resolvers: [UserResolver],
    container: Container,
});

const server = new ApolloServer({
    schema
});

// eslint-disable-next-line @typescript-eslint/require-await
const handler = startServerAndCreateNextHandler<NextRequest>(server, { context: async req => ({ req }) });

export async function GET(request: NextRequest) {
  return handler(request);
}

export async function POST(request: NextRequest) {
  return handler(request);
}
