'use client';

import { useEffect } from 'react';
import { useLogger } from 'next-axiom';

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
    log.error(error.message, error);
    console.error(error);
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
