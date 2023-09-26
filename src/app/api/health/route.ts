// https://github.com/echobind/bisonapp/blob/canary/packages/create-bison-app/template/src/pages/api/health.ts

// Editor may say this error but tsc doesn't
// TS71003: "process.env.NEXT_RUNTIME_EDGE ? 'edge' : 'nodejs'" is not a valid value for the "runtime" option. The configuration must be statically analyzable.
// This may not be imported from another file
export const runtime = 'edge';

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
