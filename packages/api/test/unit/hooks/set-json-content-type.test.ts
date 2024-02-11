import { describe, expect, test } from "bun:test";
import { setJSONAsContentType } from "@/hooks";

describe("set-json-content-type", () => {
  test("content type set to application/json", () => {
    const set = { headers: {} as { [key: string]: string } };
    setJSONAsContentType({ set });
    expect(set.headers["Content-Type"]).toBe("application/json");
  });
});
