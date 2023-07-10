// https://github.com/echobind/bisonapp/blob/canary/packages/create-bison-app/template/src/pages/api/health.ts
import { prisma } from "@/server/db/db";

export async function GET() {
  let databaseWorking = false;

  try {
    await prisma.user.findFirst();
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
      "content-type": "application/json",
    },
  });
}
