"use server";

import { authConfig } from "@/lib/firebase/config/server-config";
import { getTokens } from "next-firebase-auth-edge";
import { refreshServerCookies } from "next-firebase-auth-edge/lib/next/cookies";
import { cookies, headers } from "next/headers";

export async function refreshCookies() {
	const tokens = await getTokens(cookies(), authConfig);

	if (!tokens) {
		throw new Error("Unauthenticated");
	}

	await refreshServerCookies(cookies(), new Headers(headers()), authConfig);
}
