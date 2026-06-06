"use client";

import { useEffect } from "react";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";

/**
 * Route-segment error boundary. Renders when a server/client component throws
 * during rendering. `reset` re-attempts to render the segment.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Surface the error to the console (and any attached monitoring).
    console.error(error);
  }, [error]);

  return (
    <Container as="section" className="py-24">
      <div className="max-w-xl">
        <p className="text-sm font-medium uppercase tracking-wide text-rose-600">
          Error
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          Something went wrong.
        </h1>
        <p className="mt-4 text-slate-600 dark:text-slate-400">
          An unexpected error occurred while rendering this page. You can try
          again, or head back to the home page.
        </p>
        <div className="mt-8">
          <Button onClick={reset}>Try again</Button>
        </div>
      </div>
    </Container>
  );
}
