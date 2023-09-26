// A faulty API route to test error monitoring

// Editor may say this error but tsc doesn't
// TS71003: "process.env.NEXT_RUNTIME_EDGE ? 'edge' : 'nodejs'" is not a valid value for the "runtime" option. The configuration must be statically analyzable.
// This may not be imported from another file
export const runtime = 'edge';

export const dynamic = 'force-dynamic';

export function GET() {
  throw new Error('Example API Route Error');

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return new Response(JSON.stringify({ working: true }), {
    status: 200,
    headers: {
      'content-type': 'application/json',
    },
  });
}
