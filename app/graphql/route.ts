import 'reflect-metadata';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { ApolloServer } from '@apollo/server';
import { type NextRequest } from 'next/server';
import { buildSchema, Query, Resolver, Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
class User {
    @Field(() => ID)
    id!: string;

    @Field()
    name!: string;

    @Field()
    email!: string;
}

@Resolver(User)
class UserResolver {
    @Query(() => String)
    hello() {
        return 'Hello World!';
    }

    @Query(() => [User])
    users() {
        return [{ id: 1, name: "Adam", email: "enalmada@gmail.com"}];
    }

}

const schema = await buildSchema({
    resolvers: [UserResolver],
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
