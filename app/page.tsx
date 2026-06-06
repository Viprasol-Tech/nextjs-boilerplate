import Link from "next/link";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";

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
    title: "Tailwind CSS",
    body: "Utility-first styling with a small, themeable design token set.",
  },
  {
    title: "Tested logic",
    body: "Typed env access and SEO helpers in lib/, covered by Vitest.",
  },
];

export default function HomePage() {
  return (
    <Container as="section" className="py-16 sm:py-24">
      <div className="max-w-2xl">
        <p className="text-sm font-medium uppercase tracking-wide text-brand">
          Next.js Boilerplate
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          A clean App Router starter.
        </h1>
        <p className="mt-4 text-lg text-slate-600">
          Production-ready Next.js + TypeScript + Tailwind, with testable
          utility modules and a small component library to build on.
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

      <ul className="mt-16 grid gap-6 sm:grid-cols-2">
        {FEATURES.map((feature) => (
          <li
            key={feature.title}
            className="rounded-lg border border-slate-200 p-6"
          >
            <h2 className="text-base font-semibold text-slate-900">
              {feature.title}
            </h2>
            <p className="mt-2 text-sm text-slate-600">{feature.body}</p>
          </li>
        ))}
      </ul>
    </Container>
  );
}
