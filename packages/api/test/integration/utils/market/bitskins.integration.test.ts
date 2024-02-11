import { describe, expect, test } from "bun:test";
import * as bitskins from "@/utils/market/bitskins";
import {
  AUGSkins,
  STSkin,
  STSkinCategory,
  STSkinExterior,
  Weapon,
} from "@skintracker/types/src";

describe("bitskins", () => {
  const skin: STSkin = {
    item: Weapon.AUG,
    name: AUGSkins.HotRod,
    exterior: STSkinExterior.FN,
    category: STSkinCategory.Normal,
  };

  test("returns N/A if no API key is set", async () => {
    const apiKey = process.env.ST_BITSKINS_API_KEY;
    process.env.ST_BITSKINS_API_KEY = undefined;
    const res = await bitskins.getMinPrice(skin);
    expect(res).toBe("N/A");
    process.env.ST_BITSKINS_API_KEY = apiKey;
  });
});
