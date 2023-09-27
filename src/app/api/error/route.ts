// A faulty API route to test error monitoring

// Uncomment for Cloudflare next-on-pages (required) or Vercel edge
// export const runtime = 'edge';

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
