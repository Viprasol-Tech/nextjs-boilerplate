import Link from "next/link";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";

const FEATURES: { title: string; body: string }[] = [
  {
    title: "App Router",
    body: "Server components, layouts, and file-based routing out of the box.",
  },
  {
    title: "TypeScript strict",
    body: "Strict compiler settings and path aliases (@/*) preconfigured.",
  },
  {
    title: "Tailwind + dark mode",
    body: "Utility-first styling with a class-based light/dark/system theme.",
  },
  {
    title: "Typed env & SEO",
    body: "Validated env access and a metadata builder with JSON-LD, all tested.",
  },
  {
    title: "Fetch & format utils",
    body: "A typed fetch wrapper with timeouts plus pure formatting helpers.",
  },
  {
    title: "API route + health",
    body: "A /api/health route handler and a /status page that consumes it.",
  },
];

export default function HomePage() {
  return (
    <Container as="section" className="py-16 sm:py-24">
      <div className="max-w-2xl">
        <p className="text-sm font-medium uppercase tracking-wide text-brand">
          Next.js Boilerplate
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl">
          A clean App Router starter.
        </h1>
        <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
          Production-ready Next.js + TypeScript + Tailwind, with testable
          utility modules, dark mode, and a small component library to build on.
        </p>
        <div className="mt-8 flex gap-3">
          <Link href="/about">
            <Button size="lg">Learn more</Button>
          </Link>
          <a
            href="https://github.com/Viprasol-Tech/nextjs-boilerplate"
            target="_blank"
            rel="noreferrer"
          >
            <Button size="lg" variant="secondary">
              View on GitHub
            </Button>
          </a>
        </div>
      </div>

      <ul className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((feature) => (
          <li key={feature.title}>
            <Card title={feature.title} interactive>
              {feature.body}
            </Card>
          </li>
        ))}
      </ul>
    </Container>
  );
}
