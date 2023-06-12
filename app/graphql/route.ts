import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { ApolloServer } from '@apollo/server';
import { gql } from '@apollo/client';
import { type NextRequest } from 'next/server';

const resolvers = {
  Query: {
    hello: () => 'world',
    users: () => [{ id: 1, name: "Adam", email: "enalmada@gmail.com"}]
  },
};

const typeDefs = gql`
    type User {
        id: Int!
        name: String!
        email: String!
    }
    type Query {
        hello: String
        users: [User]
    }
`;

const server = new ApolloServer({
  resolvers,
  typeDefs,
});

// eslint-disable-next-line @typescript-eslint/require-await
const handler = startServerAndCreateNextHandler<NextRequest>(server, { context: async req => ({ req }) });

export async function GET(request: NextRequest) {
  return handler(request);
}

export async function POST(request: NextRequest) {
  return handler(request);
}
