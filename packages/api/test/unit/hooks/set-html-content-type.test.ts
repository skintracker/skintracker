import { describe, expect, test } from "bun:test";
import { setHTMLAsContentType } from "@/hooks";

describe("set-html-content-type", () => {
  test("content type set to text/html", () => {
    const set = { headers: {} as { [key: string]: string } };
    setHTMLAsContentType({ set });
    expect(set.headers["Content-Type"]).toBe("text/html");
  });
});
