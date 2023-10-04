/* eslint-disable react-hooks/rules-of-hooks */
import { type NextRequest } from 'next/server';
import { type User } from '@/server/db/schema';
import { modifiedHandleCreateOrGetUser } from '@/server/graphql/modifiedHandleCreateOrGetUser';
import { schema } from '@/server/graphql/schema';
import { useGenericAuth } from '@envelop/generic-auth';
import { EnvelopArmorPlugin } from '@escape.tech/graphql-armor';
import { useCSRFPrevention } from '@graphql-yoga/plugin-csrf-prevention';
// import { useAPQ } from '@graphql-yoga/plugin-apq';
// import { useCSRFPrevention } from '@graphql-yoga/plugin-csrf-prevention';
import { GraphQLError } from 'graphql';
import { createYoga, maskError, type Plugin, type YogaInitialContext } from 'graphql-yoga';
import { Logger } from 'next-axiom';

// import { Logger } from 'next-axiom';

export interface MyContextType {
  currentUser: User;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const plugins: Array<Plugin<any, any, any>> = [
  useGenericAuth({
    mode: 'resolve-only',
    async resolveUserFn(context: YogaInitialContext): Promise<User | null> {
      return modifiedHandleCreateOrGetUser(context.request as NextRequest);
    },
  }),
  EnvelopArmorPlugin(),
  // commenting until queries can be prepopulated in correct format so there is no initial round trip fail
  // useAPQ(),
];

// Warning - This is failing on SST in SSR. case sensitivity?
// TODO This header needs to be added to codegen.ts
plugins.push(
  useCSRFPrevention({
    requestHeaders: ['x-graphql-csrf'],
  })
);

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
      origin: process.env.NEXT_PUBLIC_REDIRECT_URL,
      //origin: process.env.NEXT_PUBLIC_VERCEL_URL ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}` : env.NEXT_PUBLIC_REDIRECT_URL,
      credentials: true,
      allowedHeaders: ['x-graphql-csrf', 'authorization'],
      methods: ['POST'],
    },
    batching: true,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    context: ({ request }: { request: NextRequest }) => {},
    // Although gql spec says everything should be 200, mapping some to semantic HTTP error codes
    // https://escape.tech/blog/graphql-errors-the-good-the-bad-and-the-ugly/
    graphiql: {
      headers: JSON.stringify({
        'x-graphql-csrf': 'true',
      }),
    },
    maskedErrors: {
      maskError(error, message, isDev) {
        if (error instanceof GraphQLError) {
          if (error?.extensions?.code) {
            return error;
          }

          // Return code and 500 status for unexpected errors (without code already)
          const newError = new GraphQLError(message, {
            nodes: error.nodes,
            source: error.source,
            positions: error.positions,
            path: error.path,
            originalError: error.originalError,
            extensions: {
              code: 'SERVER_ERROR',
              http: { status: 500 },
            },
          });

          // TODO this should probably come from axiom request
          const log = new Logger();
          log.error((error as Error)?.message || message);
          // TODO await seems to cause trouble for yoga
          // eslint-disable-next-line @typescript-eslint/no-unsafe-call
          log.flush();

          return maskError(newError, message, isDev);
        }

        // TODO await in flush seems to crash mask error
        /*
        // eslint-disable-next-line no-console
        console.log("shouldn't be here");
        // TODO this should probably come from axiom request
        const log = new Logger();
        log.error((error as Error)?.message || message);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        await log.flush();
         */

        return maskError(error, message, isDev);
      },
    },
    /*
    maskedErrors: {
      // TODO use message to return 500 for remaining unexpected system errors

      async maskError(error, message) {
        const cause = (error as GraphQLError).originalError;


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

     */
  });
}
