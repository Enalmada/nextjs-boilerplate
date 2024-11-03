"use server";

import { getFirebaseAuth } from "@/lib/firebase/auth/firebase";
import { authConfig } from "@/lib/firebase/config/server-config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { refreshCookiesWithIdToken } from "next-firebase-auth-edge/lib/next/cookies";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

export async function loginAction(username: string, password: string) {
	const credential = await signInWithEmailAndPassword(
		getFirebaseAuth(),
		username,
		password,
	);

	const idToken = await credential.user.getIdToken();
	await refreshCookiesWithIdToken(
		idToken,
		await headers(),
		await cookies(),
		authConfig,
	);
	redirect("/app");
}
