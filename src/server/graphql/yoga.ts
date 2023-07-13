/* eslint-disable react-hooks/rules-of-hooks */
import { type NextRequest } from 'next/server';
import { env } from '@/env.mjs';
import { modifiedHandleCreateOrGetUser } from '@/server/graphql/modifiedHandleCreateOrGetUser';
import { schema } from '@/server/graphql/schema';
import { useGenericAuth } from '@envelop/generic-auth';
import { EnvelopArmorPlugin } from '@escape.tech/graphql-armor';
// import { useAPQ } from '@graphql-yoga/plugin-apq';
import { useCSRFPrevention } from '@graphql-yoga/plugin-csrf-prevention';
import { type User } from '@prisma/client';
import { createYoga, type Plugin, type YogaInitialContext } from 'graphql-yoga';

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
  useCSRFPrevention({
    requestHeaders: ['authorization'],
  }),
  EnvelopArmorPlugin(),
  // useAPQ(),
];

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
      credentials: true,
      allowedHeaders: ['authorization'],
      methods: ['POST'],
    },
    batching: true,
  });
}
