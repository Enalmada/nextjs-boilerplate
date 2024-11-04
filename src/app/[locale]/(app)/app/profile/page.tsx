import { ProfileWrapper } from "@/app/[locale]/(app)/app/profile/UserProfile/UserProfile";
import {
	authConfig,
	getTokens,
} from "@enalmada/next-firebase-auth-edge-wrapper";
import type { Metadata } from "next";
import { cookies } from "next/headers";

// Generate customized metadata based on user cookies
// https://nextjs.org/docs/app/building-your-application/optimizing/metadata
export async function generateMetadata(): Promise<Metadata> {
	const tokens = await getTokens(await cookies(), authConfig);

	if (!tokens) {
		return {};
	}

	return {
		title: `${tokens.decodedToken.email} Profile`,
	};
}

export default function Profile() {
	return <ProfileWrapper />;
}
