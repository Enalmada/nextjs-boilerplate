"use client";

import { useLogger } from "next-axiom";
import { useEffect } from "react";

export default function GlobalError({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	const log = useLogger();

	useEffect(() => {
		// Log the error to an error reporting service
		log.error(JSON.stringify(error));
		console.error(`${error.message} ${error.digest}`);
	}, [error, log]);

	return (
		<html>
			<body>
				<h2>Something went wrong!</h2>
				<button onClick={() => reset()}>Try again</button>
			</body>
		</html>
	);
}
