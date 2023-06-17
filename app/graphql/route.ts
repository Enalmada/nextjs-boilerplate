import 'reflect-metadata';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { ApolloServer } from '@apollo/server';
import { type NextRequest } from 'next/server';
import { buildSchema } from 'type-graphql';
import {UserResolver} from "@/user/user.resolver";
import { Container } from "typedi";

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
