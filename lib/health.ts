/**
 * Health-check payload shaping. Kept separate from the route handler so the
 * response body is a pure, unit-testable function.
 */

export interface HealthStatus {
  status: "ok";
  service: string;
  version: string;
  environment: string;
  timestamp: string;
  uptimeSeconds: number;
}

export interface HealthInput {
  service: string;
  version: string;
  environment: string;
  /** Process uptime in seconds (fractional ok); clamped to >= 0. */
  uptimeSeconds: number;
  /** Current time; injectable for deterministic tests. */
  now?: Date;
}

/** Builds the JSON body returned by the health-check route. */
export function buildHealthStatus(input: HealthInput): HealthStatus {
  return {
    status: "ok",
    service: input.service,
    version: input.version,
    environment: input.environment,
    timestamp: (input.now ?? new Date()).toISOString(),
    uptimeSeconds: Math.max(0, Math.round(input.uptimeSeconds)),
  };
}
