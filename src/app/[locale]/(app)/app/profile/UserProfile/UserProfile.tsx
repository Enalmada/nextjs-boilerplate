"use client";

import { Button, Card, CardBody } from "@/client/ui";
import { useAuth } from "@enalmada/next-firebase-auth-edge-wrapper";
import { Chip } from "@nextui-org/react";
import Image from "next/image";
import NextLink from "next/link";

interface UserProfileProps {
	count: number;
}

export function ProfileWrapper() {
	return (
		<div>
			<nav>
				<Button as={NextLink} href="/app">
					Back to App
				</Button>
			</nav>
			<h1>Profile page</h1>
			<UserProfile count={0} />
		</div>
	);
}

export function UserProfile({ count }: UserProfileProps) {
	const { user } = useAuth();

	if (!user) {
		return null;
	}

	return (
		<>
			<Card>
				<CardBody>
					<h3>You are logged in as</h3>
					<div>
						<div>
							{user.photoURL && (
								<Image alt="" height="100" width="100" src={user.photoURL} />
							)}
						</div>
						<span>{user.email}</span>
					</div>

					{!user.emailVerified && (
						<div>
							<Chip>Email not verified.</Chip>
						</div>
					)}
					{user.emailVerified && (
						<div>
							<Chip>Email verified.</Chip>
						</div>
					)}

					<div>
						<h5>Custom claims</h5>
						<pre>{JSON.stringify(user.customClaims, undefined, 2)}</pre>
					</div>
				</CardBody>
			</Card>

			<Card>
				<CardBody>
					<h3>
						{/* defaultCount is updated by server */}
						Counter: {count}
					</h3>
				</CardBody>
			</Card>
		</>
	);
}
