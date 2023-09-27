// https://github.com/echobind/bisonapp/blob/canary/packages/create-bison-app/template/src/pages/api/health.ts

// Uncomment for Cloudflare next-on-pages (required) or Vercel edge
// export const runtime = 'edge';

export const dynamic = 'force-dynamic';

export function GET() {
  let databaseWorking = false;

  try {
    // TODO fill this in with something appropriate for serverless db
    databaseWorking = true;
  } catch (err) {}

  const data = {
    status: {
      database: databaseWorking,
    },
  };

  const healthy = databaseWorking;

  const statusCode = healthy ? 200 : 503;

  return new Response(JSON.stringify(data), {
    status: statusCode,
    headers: {
      'content-type': 'application/json',
    },
  });
}
