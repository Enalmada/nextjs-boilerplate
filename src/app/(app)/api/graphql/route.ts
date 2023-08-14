import { type NextRequest } from 'next/server';
import { makeYoga } from '@/server/graphql/yoga';

// Editor may say this error but tsc doesn't
// TS71003: "process.env.NEXT_RUNTIME_EDGE ? 'edge' : 'nodejs'" is not a valid value for the "runtime" option. The configuration must be statically analyzable.
// This may not be imported from another file
export const runtime = 'edge';

export const dynamic = 'force-dynamic';

const { handleRequest } = makeYoga('/api/graphql');

export const GET = (request: NextRequest) => {
  return handleRequest(request, { context: (request: NextRequest) => ({ request }) });
};

export const POST = (request: NextRequest) => {
  return handleRequest(request, { context: (request: NextRequest) => ({ request }) });
};
