import { randomUUID } from "crypto";
import { createClient } from "@libsql/client";
import { STSkin } from "@skintracker/types/src";
import logger from "../logging";
import { skinCategoryToInt, skinExteriorToInt } from "../type-conversion";

export const db = (() => {
  if (!Bun.env.TURSO_URL) {
    console.error("TURSO_URL not set!");
    return undefined;
  }
  return createClient({
    url: Bun.env.TURSO_URL,
    authToken: Bun.env.TURSO_TOKEN,
    fetch: fetch,
  });
})() as ReturnType<typeof createClient> | undefined;

export const queries = {
  getUserTrackedSkins: (steamid: string) => {
    return db?.execute({
      sql: "SELECT item, name, category, exterior, phase FROM tracked_skins WHERE steamid = ?",
      args: [steamid],
    });
  },
  addUserTrackedSkin: (steamid: string, skin: STSkin) => {
    return db?.execute({
      sql: "INSERT INTO tracked_skins (id, steamid, item, name, category, exterior, phase) VALUES (?, ?, ?, ?, ?, ?, ?)",
      args: [
        randomUUID(),
        steamid,
        skin.item,
        skin.name,
        skinCategoryToInt(skin.category),
        skinExteriorToInt(skin.exterior),
        skin.phase ?? null,
      ],
    });
  },
  removeUserTrackedSkin: async (steamid: string, skin: STSkin) => {
    const tx = await db?.transaction("write");

    const sql = `DELETE FROM tracked_skins WHERE steamid = ? AND item = ? AND name = ? AND category = ? AND exterior = ?${
      skin.phase && skin.phase !== null ? " AND phase = ?" : ""
    }`;
    const args: (string | number)[] = [
      steamid,
      skin.item,
      skin.name,
      skinCategoryToInt(skin.category),
      skinExteriorToInt(skin.exterior),
    ];

    if (skin.phase && skin.phase !== null) args.push(skin.phase);

    logger.info({ sql, args });

    const res = await tx?.execute({
      sql,
      args,
    });
    await tx?.commit().then(() => tx?.close());
    return res;
  },
};

export default db;
