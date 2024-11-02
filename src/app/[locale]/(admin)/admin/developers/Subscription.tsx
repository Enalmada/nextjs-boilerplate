"use client";

import { NOTIFICATION_EVENTS } from "@/client/gql/admin-queries.gql";
import type { NotificationEvent } from "@/client/gql/generated/graphql";
import { useSubscription } from "@enalmada/next-gql/client";

// https://formidable.com/open-source/urql/docs/advanced/subscriptions/

const handleSubscription = (
	messages: NotificationEvent[] | undefined,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	response: { notificationEvents: any },
) => {
	// Provide a default empty array if messages is undefined
	const safeMessages = messages ?? [];
	// eslint-disable-next-line @typescript-eslint/no-unsafe-return
	return [response.notificationEvents, ...safeMessages];
};

const Subscription = () => {
	const [result] = useSubscription(
		{ query: NOTIFICATION_EVENTS },
		handleSubscription,
	);

	if (!result.data) {
		return <p>No new messages</p>;
	}

	return (
		<>
			{result.data.map((event: NotificationEvent) => (
				<ul key={event.id}>
					<p>
						{event.type}: &quot;{event.message}&quot;
					</p>
				</ul>
			))}
		</>
	);
};

export default Subscription;
