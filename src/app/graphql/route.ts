import "reflect-metadata";

import { type NextApiRequest, type NextApiResponse } from "next";
import { type NextRequest, type NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { TaskResolver } from "@/server/task/task.resolver";
import { UserResolver } from "@/server/user/user.resolver";
import { CustomAuthChecker } from "@/server/utils/customAuthorized";
import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { getServerSession } from "next-auth";
import { container } from "tsyringe";
import { buildSchema } from "type-graphql";

const schema = await buildSchema({
  resolvers: [UserResolver, TaskResolver],
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument,@typescript-eslint/no-unsafe-return
  container: { get: (cls) => container.resolve(cls) },
  authChecker: CustomAuthChecker,
});

const server = new ApolloServer({
  schema,
});

// Had to beat some types into submission.  Likely as a consequence of trying to use /app vs /pages api routes
// and those types not being fully supported by @as-integrations/next
// https://stackoverflow.com/a/76321588/1502448
const handler: (req: NextRequest, res: NextApiResponse) => Promise<unknown> =
  startServerAndCreateNextHandler<NextApiRequest>(server, {
    context: async (req, resUnknown) => {
      const res = resUnknown as unknown as NextResponse;
      return {
        req,
        res,
        test: "filled",
        session: await getServerSession(
          req,
          {
            ...res,
            getHeader: (name: string) => res.headers?.get(name),
            setHeader: (name: string, value: string) => res.headers?.set(name, value),
          } as unknown as NextApiResponse,
          authOptions
        ),
      };
    },
  });

export async function GET(req: NextRequest, res: NextApiResponse) {
  return handler(req, res);
}

export async function POST(req: NextRequest, res: NextApiResponse) {
  return handler(req, res);
}
