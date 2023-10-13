import { type NextRequest } from 'next/server';
import { graphqlServer } from '@/server/graphql/server';

// Uncomment for Cloudflare next-on-pages (required) or Vercel edge
// export const runtime = 'edge';

export const dynamic = 'force-dynamic';

const { handleRequest } = graphqlServer('/api/graphql');

export const GET = (request: NextRequest) => {
  return handleRequest(request, { context: (request: NextRequest) => ({ request }) });
};

export const POST = (request: NextRequest) => {
  return handleRequest(request, { context: (request: NextRequest) => ({ request }) });
};
