import { gzipEncode } from "@/hooks";
import { describe, expect, test } from "bun:test";
import { Elysia } from "elysia";

describe("gzip-encode", () => {
  test("encode string result", async () => {
    const app = new Elysia().onAfterHandle(gzipEncode).get("/", () => "test");
    const res = await app.handle(new Request("http://localhost/"));
    expect(res.headers.get("Content-Encoding")).toBe("gzip");

    const buffer = await res.arrayBuffer();
    const decoder = new TextDecoder();
    const decompressedBytes = Bun.gunzipSync(buffer);
    const decodedText = decoder.decode(decompressedBytes.buffer);
    expect(decodedText).toBe("test");
  });
  test("encode JSON result", async () => {
    const app = new Elysia()
      .onAfterHandle(gzipEncode)
      .get("/", () => ({ test: "test" }));
    const res = await app.handle(new Request("http://localhost/"));
    expect(res.headers.get("Content-Encoding")).toBe("gzip");

    const buffer = await res.arrayBuffer();
    const decoder = new TextDecoder();
    const decompressedBytes = Bun.gunzipSync(buffer);
    const decodedText = decoder.decode(decompressedBytes.buffer);
    expect(decodedText).toBe('{"test":"test"}');
  });
  test("encode empty result", async () => {
    const app = new Elysia().onAfterHandle(gzipEncode).get("/", () => "");
    const res = await app.handle(new Request("http://localhost/"));
    expect(res.headers.get("Content-Encoding")).toBe("gzip");

    const buffer = await res.arrayBuffer();
    const decoder = new TextDecoder();
    const decompressedBytes = Bun.gunzipSync(buffer);
    const decodedText = decoder.decode(decompressedBytes.buffer);
    expect(decodedText).toBe("");
  });
});
