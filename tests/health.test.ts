import { describe, it, expect } from "vitest";
import { buildHealthStatus } from "@/lib/health";

describe("buildHealthStatus", () => {
  const base = {
    service: "nextjs-boilerplate",
    version: "0.2.0",
    environment: "test",
    uptimeSeconds: 12.7,
  };

  it("reports an ok status with the given metadata", () => {
    const status = buildHealthStatus({
      ...base,
      now: new Date("2025-01-01T00:00:00Z"),
    });
    expect(status.status).toBe("ok");
    expect(status.service).toBe("nextjs-boilerplate");
    expect(status.version).toBe("0.2.0");
    expect(status.environment).toBe("test");
    expect(status.timestamp).toBe("2025-01-01T00:00:00.000Z");
  });

  it("rounds uptime to whole seconds", () => {
    expect(buildHealthStatus(base).uptimeSeconds).toBe(13);
  });

  it("clamps negative uptime to zero", () => {
    expect(
      buildHealthStatus({ ...base, uptimeSeconds: -5 }).uptimeSeconds,
    ).toBe(0);
  });

  it("defaults the timestamp to the current time", () => {
    const before = Date.now();
    const ts = Date.parse(buildHealthStatus(base).timestamp);
    expect(ts).toBeGreaterThanOrEqual(before - 1000);
  });
});
