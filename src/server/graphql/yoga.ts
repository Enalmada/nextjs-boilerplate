/* eslint-disable react-hooks/rules-of-hooks */
import { type NextRequest } from 'next/server';
import { env } from '@/env.mjs';
import { NotAuthorizedError, NotFoundError } from '@/server/graphql/errors';
import { modifiedHandleCreateOrGetUser } from '@/server/graphql/modifiedHandleCreateOrGetUser';
import { schema } from '@/server/graphql/schema';
import { type User } from '@/server/user/user.repository';
import { useGenericAuth } from '@envelop/generic-auth';
import { EnvelopArmorPlugin } from '@escape.tech/graphql-armor';
// import { useAPQ } from '@graphql-yoga/plugin-apq';
// import { useCSRFPrevention } from '@graphql-yoga/plugin-csrf-prevention';
import { GraphQLError } from 'graphql';
import { createYoga, type Plugin, type YogaInitialContext } from 'graphql-yoga';
import { Logger } from 'next-axiom';

export interface MyContextType {
  currentUser: User;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const plugins: Array<Plugin<any, any, any>> = [
  useGenericAuth({
    mode: 'resolve-only',
    async resolveUserFn(context: YogaInitialContext) {
      return await modifiedHandleCreateOrGetUser(context.request as NextRequest);
    },
  }),
  EnvelopArmorPlugin(),
  // commenting until queries can be prepopulated in correct format so there is no initial round trip fail
  // useAPQ(),
];

// This is failing on SST in SSR likely due to case sensitivity
/*
if (env.APP_ENV != 'local') {
  plugins.push(
    useCSRFPrevention({
      requestHeaders: ['authorization'],
    })
  );
}

 */

export function makeYoga(graphqlEndpoint: string) {
  // Next.js Custom Route Handler: https://nextjs.org/docs/app/building-your-application/routing/router-handlers
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return createYoga<unknown, { currentUser: User }>({
    schema,
    plugins,
    // While using Next.js file convention for routing, we need to configure Yoga to use the correct endpoint
    graphqlEndpoint,
    // Yoga needs to know how to create a valid Next response
    fetchAPI: { Response },
    cors: {
      origin: env.NEXT_PUBLIC_REDIRECT_URL,
      //origin: process.env.NEXT_PUBLIC_VERCEL_URL ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}` : env.NEXT_PUBLIC_REDIRECT_URL,
      credentials: true,
      allowedHeaders: ['authorization'],
      methods: ['POST'],
    },
    batching: true,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    context: ({ request }: { request: NextRequest }) => {},
    // Although gql spec says everything should be 200, mapping some to semantic HTTP error codes
    // https://escape.tech/blog/graphql-errors-the-good-the-bad-and-the-ugly/
    maskedErrors: {
      // TODO use message to return 500 for remaining unexpected system errors

      async maskError(error, message) {
        const cause = (error as GraphQLError).originalError;

        // Transform JS error objects into GraphQL errors
        if (cause instanceof NotAuthorizedError)
          return new GraphQLError(cause.message, {
            extensions: {
              code: cause.name,
              http: { status: 401 },
            },
          });

        if (cause instanceof NotFoundError)
          return new GraphQLError(cause.message, {
            extensions: {
              code: cause.name,
              http: { status: 404 },
            },
          });

        // TODO this should probably come from axiom request
        const log = new Logger();
        log.error(cause?.message || message);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        await log.flush();
        // Default to 500
        // Error is masked for security reasons
        // https://the-guild.dev/graphql/yoga-server/docs/features/error-masking
        return new GraphQLError(message, {
          extensions: {
            code: 'UnexpectedError',
            http: { status: 500 },
          },
        });
      },
    },
  });
}
