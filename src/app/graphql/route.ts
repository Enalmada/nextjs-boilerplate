import "reflect-metadata";

import { type NextApiResponse } from "next";
import { type NextRequest } from "next/server";
import { authConfig } from "@/config/server-config";
import { TaskResolver } from "@/server/task/task.resolver";
import { UserResolver } from "@/server/user/user.resolver";
import UserService from "@/server/user/user.service";
import { CustomAuthChecker } from "@/server/utils/customAuthorized";
import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { getTokens } from "next-firebase-auth-edge/lib/next/tokens";
import { container } from "tsyringe";
import type InjectionToken from "tsyringe/dist/typings/providers/injection-token";
import { buildSchema } from "type-graphql";

export const runtime = "edge"; // https://github.com/cloudflare/next-on-pages

const schema = await buildSchema({
  resolvers: [UserResolver, TaskResolver],
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  container: { get: (cls: InjectionToken) => container.resolve(cls) },
  authChecker: CustomAuthChecker,
});

const server = new ApolloServer({
  schema,
});

const handleFirebase = async (req: NextRequest) => {
  const tokens = await getTokens(req.cookies, authConfig);
  const { uid: firebaseId, email } = tokens?.decodedToken ?? {};
  return firebaseId ? await UserService.createOrGetFirebaseUser(firebaseId, email) : null;
};

// Had to beat some types into submission.  Likely as a consequence of trying to use /app vs /pages api routes
// and those types not being fully supported by @as-integrations/next
// https://stackoverflow.com/a/76321588/1502448
const handler: (req: NextRequest, res: NextApiResponse) => Promise<unknown> =
  startServerAndCreateNextHandler<NextRequest>(server, {
    context: async (req, res) => {
      return { req, res, user: await handleFirebase(req) };
    },
  });

export async function GET(req: NextRequest, res: NextApiResponse) {
  return handler(req, res);
}

export async function POST(req: NextRequest, res: NextApiResponse) {
  return handler(req, res);
}
