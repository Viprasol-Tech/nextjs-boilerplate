import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = buildMetadata(siteConfig(), {
  title: "About",
  description: "What this Next.js boilerplate includes and how it is organized.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <Container as="section" className="py-16 sm:py-24">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
        About this starter
      </h1>
      <div className="mt-6 max-w-2xl space-y-4 text-slate-600 dark:text-slate-400">
        <p>
          This boilerplate gives you a Next.js App Router project with
          TypeScript in strict mode and Tailwind CSS already wired up. It is
          intentionally small: the goal is a clean foundation, not a framework.
        </p>
        <p>
          Reusable logic lives in <code>lib/</code> — typed environment access,
          an SEO metadata builder with JSON-LD, a fetch wrapper, formatting
          helpers, and a health-status shaper — all unit-tested with Vitest.
          Shared UI lives in <code>components/</code> and includes a{" "}
          <code>Button</code>, <code>Card</code>, <code>Badge</code>,{" "}
          <code>Container</code>, and a light/dark/system theme toggle.
        </p>
        <p>
          Run <code>npm run typecheck</code> and <code>npm test</code> to verify
          the project, then start building your own routes under{" "}
          <code>app/</code>.
        </p>
      </div>
    </Container>
  );
}
