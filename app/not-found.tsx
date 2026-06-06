import Link from "next/link";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";

/** Rendered for unmatched routes (404). */
export default function NotFound() {
  return (
    <Container as="section" className="py-24">
      <div className="max-w-xl">
        <p className="text-sm font-medium uppercase tracking-wide text-brand">
          404
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          Page not found.
        </h1>
        <p className="mt-4 text-slate-600 dark:text-slate-400">
          The page you are looking for does not exist or has been moved.
        </p>
        <div className="mt-8">
          <Link href="/">
            <Button>Back to home</Button>
          </Link>
        </div>
      </div>
    </Container>
  );
}
