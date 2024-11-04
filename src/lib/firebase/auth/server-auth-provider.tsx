import { cacheExchange } from "@/client/gql/cacheExchange";
import { baseURL } from "@/metadata.config";
import { getUser } from "@enalmada/next-firebase-auth-edge-wrapper";
import { AuthProvider } from "@enalmada/next-firebase-auth-edge-wrapper/client/AuthProvider";
import { UrqlWrapper as NextGqlProvider } from "@enalmada/next-gql/client/urql/UrqlWrapper";
import { cookies, headers } from "next/headers";
import type React from "react";

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
	const cookieStore = await cookies();
	const url = `${baseURL}/api/graphql`;

	const user = await getUser(cookieStore, await headers());

	return (
		<AuthProvider user={user}>
			<NextGqlProvider
				url={url}
				isLoggedIn={!!user}
				cookie={JSON.stringify(cookieStore)}
				cacheExchange={cacheExchange}
				nonce={nonce}
			>
				{children}
			</NextGqlProvider>
		</AuthProvider>
	);
}
