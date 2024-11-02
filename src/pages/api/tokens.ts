import { authConfig } from "@/lib/firebase/config/server-config";
import type { NextApiRequest, NextApiResponse } from "next";
import { getApiRequestTokens } from "next-firebase-auth-edge/lib/next/tokens";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	const tokens = await getApiRequestTokens(req, {
		apiKey: authConfig.apiKey,
		cookieName: authConfig.cookieName,
		cookieSignatureKeys: authConfig.cookieSignatureKeys,
		serviceAccount: authConfig.serviceAccount,
	});

	return res.status(200).json({ tokens });
}
