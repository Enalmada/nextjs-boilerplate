/* eslint-disable react-hooks/rules-of-hooks */
import { type NextRequest } from 'next/server';
import { env } from '@/env.mjs';
import { type RequestReport } from '@/lib/logging/log-util';
import { NotAuthorizedError, NotFoundError } from '@/server/graphql/errors';
import { modifiedHandleCreateOrGetUser } from '@/server/graphql/modifiedHandleCreateOrGetUser';
import { schema } from '@/server/graphql/schema';
import { useGenericAuth } from '@envelop/generic-auth';
import { EnvelopArmorPlugin } from '@escape.tech/graphql-armor';
// import { useAPQ } from '@graphql-yoga/plugin-apq';
import { useCSRFPrevention } from '@graphql-yoga/plugin-csrf-prevention';
import { type User } from '@prisma/client';
import { GraphQLError } from 'graphql';
import { createYoga, type Plugin, type YogaInitialContext } from 'graphql-yoga';

export interface MyContextType {
  currentUser: User;
  report: RequestReport; // RequestReport is not exported properly from axiom
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
  // useAPQ(),
];

if (env.APP_ENV != 'local') {
  plugins.push(
    useCSRFPrevention({
      requestHeaders: ['authorization'],
    })
  );
}

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
    context: ({ request }: { request: NextRequest }) => {
      // code from next-axios logger combining their api and edge RequestReport
      // https://github.com/axiomhq/next-axiom/blob/00f97e0619aa7e47d91f4fe9b11cf5a72fdf6815/src/logger.ts
      const report: RequestReport = {
        startTime: new Date().getTime(),
        ip: request.headers.get('x-forwarded-for') || request.ip,
        region: request.geo?.region || process.env.VERCEL_REGION,
        host: request.nextUrl.host || request.headers.get('host') || '',
        method: request.method,
        path: request.nextUrl.pathname || request.url,
        scheme: request.nextUrl.protocol.replace(':', ''),
        userAgent: request.headers.get('user-agent'),
      };
      return { report };
    },
    // Although gql spec says everything should be 200, mapping some to semantic HTTP error codes
    // https://escape.tech/blog/graphql-errors-the-good-the-bad-and-the-ugly/
    maskedErrors: {
      // TODO use message to return 500 for remaining unexpected system errors

      maskError(error, message) {
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
