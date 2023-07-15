import { type NextRequest } from 'next/server';
import { makeYoga } from '@/server/graphql/yoga';

// export const runtime = 'edge';

const { handleRequest } = makeYoga('/api/graphql');

export const GET = (request: NextRequest) => {
  return handleRequest(request, { context: (request: NextRequest) => ({ request }) });
};

export const POST = (request: NextRequest) => {
  return handleRequest(request, { context: (request: NextRequest) => ({ request }) });
};
