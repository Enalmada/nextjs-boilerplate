import { type NextRequest } from 'next/server';
import { env } from '@/env.mjs';
import { makeYoga } from '@/server/graphql/yoga';

// export const runtime = 'edge';
export const dynamic = 'force-dynamic';

const { handleRequest } = makeYoga(env.NEXT_PUBLIC_GRAPHQL_ENDPOINT);

export const GET = (request: NextRequest) => {
  return handleRequest(request, { context: (request: NextRequest) => ({ request }) });
};

export const POST = (request: NextRequest) => {
  return handleRequest(request, { context: (request: NextRequest) => ({ request }) });
};
