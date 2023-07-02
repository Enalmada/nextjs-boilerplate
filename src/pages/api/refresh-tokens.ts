// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { authConfig } from "@/config/server-config";
import { refreshAuthCookies } from "next-firebase-auth-edge/lib/next/cookies";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const bearerToken = req.headers["authorization"]?.split(" ")[1] ?? "";
  const { idToken, refreshToken } = await refreshAuthCookies(bearerToken, res, {
    ...authConfig,
    cookieSerializeOptions: {
      // TODO identify if this could share authConfig.  It was strict in example code.
      sameSite: "strict" as const,
    },
  });

  res.status(200).json({ bearerToken, idToken, refreshToken });
}
