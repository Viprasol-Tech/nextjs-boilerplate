import { Container } from "@/components/Container";

/**
 * Route-level loading UI shown while a server component streams in. Renders a
 * lightweight skeleton so layout does not shift when content arrives.
 */
export default function Loading() {
  return (
    <Container as="section" className="py-24">
      <div
        className="max-w-2xl animate-pulse space-y-4"
        role="status"
        aria-label="Loading"
      >
        <div className="h-4 w-32 rounded bg-slate-200 dark:bg-slate-700" />
        <div className="h-10 w-3/4 rounded bg-slate-200 dark:bg-slate-700" />
        <div className="h-4 w-full rounded bg-slate-200 dark:bg-slate-700" />
        <div className="h-4 w-5/6 rounded bg-slate-200 dark:bg-slate-700" />
      </div>
    </Container>
  );
}
