import { type NextRequest } from 'next/server';
import { makeYoga } from '@/server/graphql/yoga';

// export const runtime = 'edge';
export const dynamic = 'force-dynamic';

const { handleRequest } = makeYoga('/api/graphql');

export const GET = (request: NextRequest) => {
  return handleRequest(request, { context: (request: NextRequest) => ({ request }) });
};

export const POST = (request: NextRequest) => {
  return handleRequest(request, { context: (request: NextRequest) => ({ request }) });
};