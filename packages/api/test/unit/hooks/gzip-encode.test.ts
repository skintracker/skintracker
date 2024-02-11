import { describe, test, expect, mock } from "bun:test";
import { gzipEncode } from "@/hooks";

describe("gzip-encode", () => {
  test("encode JSON object", () => {
    const response = { hello: "world" };
    const set = { headers: {} as { [key: string]: string } };
    gzipEncode({ response, set });
    expect(set.headers["Content-Encoding"]).toBe("gzip");
    expect(set.headers["Content-Type"]).toBe("application/json; charset=utf-8");
  });
  test("encode string", () => {
    const response = "hello world";
    const set = { headers: {} as { [key: string]: string } };
    gzipEncode({ response, set });
    expect(set.headers["Content-Encoding"]).toBe("gzip");
  });
  test("encode empty response", () => {
    const response = "";
    const set = { headers: {} as { [key: string]: string } };
    gzipEncode({ response, set });
    expect(set.headers["Content-Encoding"]).toBe("gzip");
  });
});
