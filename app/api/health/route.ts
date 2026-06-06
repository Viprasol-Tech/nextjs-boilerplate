import { NextResponse } from "next/server";
import { readEnv } from "@/lib/env";
import { buildHealthStatus } from "@/lib/health";
import pkg from "@/package.json";

/** Always evaluate at request time so uptime/timestamp are fresh. */
export const dynamic = "force-dynamic";

/**
 * GET /api/health
 *
 * Lightweight liveness endpoint returning service metadata and uptime. Useful
 * for uptime monitors, container health checks, and load-balancer probes.
 */
export function GET() {
  const env = readEnv();
  const body = buildHealthStatus({
    service: pkg.name,
    version: pkg.version,
    environment: env.nodeEnv,
    uptimeSeconds: process.uptime(),
  });

  return NextResponse.json(body, {
    status: 200,
    headers: { "Cache-Control": "no-store" },
  });
}
