"use client";

import { logout } from "@enalmada/next-firebase-auth-edge-wrapper";
import { useEffect } from "react";

export default function LogoutPage() {
	useEffect(() => {
		const clearCache = async () => {
			try {
				// Urql cache is unique to tenant and will be cleared when it changes
				// https://formidable.com/open-source/urql/docs/advanced/authentication/#cache-invalidation-on-logout
				await logout();
				// router.refresh(); // This seems necessary to avoid a full window.reload
				// TODO get router.replace working again
				// router.replace('/');

				window.location.replace("/");
			} catch (error) {
				console.error("Error clearing client cache:", error);
			}
		};

		void clearCache();
		// getFirebaseAuth dependency will cause infinite loading
		// eslint-disable-next-line
	}, []);

	return null;
}
