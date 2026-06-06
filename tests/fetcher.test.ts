import { describe, it, expect, vi } from "vitest";
import { fetchJson, withQuery, HttpError } from "@/lib/fetcher";

function jsonResponse(body: unknown, init: ResponseInit = {}): Response {
  return new Response(JSON.stringify(body), {
    status: 200,
    headers: { "Content-Type": "application/json" },
    ...init,
  });
}

describe("withQuery", () => {
  it("returns the url unchanged with no params", () => {
    expect(withQuery("/api")).toBe("/api");
  });

  it("appends an encoded query string", () => {
    expect(withQuery("/api", { q: "a b", page: 2 })).toBe("/api?q=a%20b&page=2");
  });

  it("omits undefined values", () => {
    expect(withQuery("/api", { a: 1, b: undefined })).toBe("/api?a=1");
  });

  it("uses & when the url already has a query", () => {
    expect(withQuery("/api?x=1", { y: 2 })).toBe("/api?x=1&y=2");
  });

  it("encodes boolean values", () => {
    expect(withQuery("/api", { on: true })).toBe("/api?on=true");
  });
});

describe("fetchJson", () => {
  it("parses a successful JSON response typed as T", async () => {
    const impl = vi.fn(async () => jsonResponse({ id: 1, name: "x" }));
    const data = await fetchJson<{ id: number; name: string }>(
      "/api/item",
      {},
      impl as unknown as typeof fetch,
    );
    expect(data).toEqual({ id: 1, name: "x" });
    expect(impl).toHaveBeenCalledOnce();
  });

  it("sends an Accept: application/json header by default", async () => {
    const impl = vi.fn(
      async (_url: string, _init?: RequestInit) => jsonResponse({}),
    );
    await fetchJson("/api", {}, impl as unknown as typeof fetch);
    const init = impl.mock.calls[0][1] as RequestInit;
    expect((init.headers as Record<string, string>).Accept).toBe(
      "application/json",
    );
  });

  it("throws HttpError with the status on non-2xx", async () => {
    const impl = vi.fn(async () =>
      jsonResponse({ error: "nope" }, { status: 404, statusText: "Not Found" }),
    );
    await expect(
      fetchJson("/api/missing", {}, impl as unknown as typeof fetch),
    ).rejects.toBeInstanceOf(HttpError);

    try {
      await fetchJson("/api/missing", {}, impl as unknown as typeof fetch);
    } catch (err) {
      expect((err as HttpError).status).toBe(404);
      expect((err as HttpError).url).toBe("/api/missing");
    }
  });

  it("aborts when the timeout elapses", async () => {
    const impl = (_url: string, init?: RequestInit) =>
      new Promise<Response>((_resolve, reject) => {
        init?.signal?.addEventListener("abort", () =>
          reject(new DOMException("Aborted", "AbortError")),
        );
      });
    await expect(
      fetchJson("/slow", { timeoutMs: 5 }, impl as unknown as typeof fetch),
    ).rejects.toMatchObject({ name: "AbortError" });
  });
});

describe("HttpError", () => {
  it("carries a descriptive message", () => {
    const err = new HttpError(500, "Server Error", "/x");
    expect(err.message).toContain("500");
    expect(err.message).toContain("/x");
    expect(err.name).toBe("HttpError");
  });
});
