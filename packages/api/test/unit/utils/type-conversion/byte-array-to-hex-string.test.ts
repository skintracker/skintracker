import { describe, expect, test } from "bun:test";
import { byteArrayToHexString } from "@/utils/type-conversion";

describe("byte-array-to-hex-string", () => {
  test("returns empty for undefined array", () => {
    const res = byteArrayToHexString(undefined as unknown as Uint8Array);
    expect(res).toBe("");
  });
  test("returns hex string for defined array", () => {
    const res = byteArrayToHexString(new Uint8Array([0, 1, 2, 3, 4]));
    expect(res).toBe("0001020304");
  });
});
