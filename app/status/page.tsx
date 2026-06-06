import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { Card } from "@/components/Card";
import { Badge } from "@/components/Badge";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { readEnv } from "@/lib/env";
import { buildHealthStatus } from "@/lib/health";
import { capitalize, formatDate, pluralize } from "@/lib/format";
import pkg from "@/package.json";

export const metadata: Metadata = buildMetadata(siteConfig(), {
  title: "Status",
  description: "Live service status and runtime metadata for this deployment.",
  path: "/status",
  keywords: ["status", "health", "uptime"],
});

/** Render at request time so uptime/timestamp reflect the current process. */
export const dynamic = "force-dynamic";

export default function StatusPage() {
  const env = readEnv();
  const health = buildHealthStatus({
    service: pkg.name,
    version: pkg.version,
    environment: env.nodeEnv,
    uptimeSeconds: process.uptime(),
  });

  const rows: { label: string; value: string }[] = [
    { label: "Service", value: health.service },
    { label: "Version", value: `v${health.version}` },
    { label: "Environment", value: capitalize(health.environment) },
    { label: "Uptime", value: pluralize(health.uptimeSeconds, "second") },
    { label: "Date", value: formatDate(health.timestamp) },
  ];

  return (
    <Container as="section" className="py-16 sm:py-24">
      <div className="flex items-center gap-3">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          Service status
        </h1>
        <Badge tone="success">Operational</Badge>
      </div>
      <p className="mt-4 max-w-2xl text-slate-600 dark:text-slate-400">
        This page mirrors the JSON returned by{" "}
        <code>GET /api/health</code>, rendered server-side with the typed{" "}
        <code>lib/health</code> and <code>lib/format</code> helpers.
      </p>

      <Card className="mt-8 max-w-md" title="Runtime">
        <dl className="divide-y divide-slate-100 dark:divide-slate-800">
          {rows.map((row) => (
            <div key={row.label} className="flex justify-between py-2">
              <dt className="font-medium text-slate-700 dark:text-slate-300">
                {row.label}
              </dt>
              <dd className="text-slate-600 dark:text-slate-400">{row.value}</dd>
            </div>
          ))}
        </dl>
      </Card>
    </Container>
  );
}
