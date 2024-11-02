import { cacheExchange } from "@/client/gql/cacheExchange";
import { baseURL } from "@/metadata.config";
import { UrqlWrapper as NextGqlProvider } from "@enalmada/next-gql/client/urql/UrqlWrapper";
import { getTokens } from "next-firebase-auth-edge/lib/next/tokens";
import { cookies, headers } from "next/headers";
import type React from "react";

import { toUser } from "@/app/shared/user";
import { authConfig } from "../config/server-config";
import { AuthProvider } from "./AuthProvider";

// I would prefer AuthProvider and UrqlWrapper separate but I would need to create
// a ServerUrqlWrapper that immediately fetches the same data (tokens and cookies).
// feels like a waste so combining for now.
export async function ServerAuthProvider({
	nonce,
	children,
}: {
	nonce?: string;
	children: React.ReactNode;
}) {
	const cookieStore = cookies();
	const url = `${baseURL}/api/graphql`;

	const tokens = await getTokens(cookies(), {
		...authConfig,
		headers: headers(),
	});
	const user = tokens ? toUser(tokens) : null;

	return (
		<AuthProvider user={user}>
			<NextGqlProvider
				url={url}
				isLoggedIn={!tokens}
				cookie={JSON.stringify(cookieStore)}
				cacheExchange={cacheExchange}
				nonce={nonce}
			>
				{children}
			</NextGqlProvider>
		</AuthProvider>
	);
}
