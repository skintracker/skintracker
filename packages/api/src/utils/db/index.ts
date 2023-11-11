import { createClient } from "@libsql/client";
import { STSkin } from "@skintracker/types/src";
import { randomUUID } from "crypto";

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
        skin.category,
        skin.exterior,
        skin.phase ?? null,
      ],
    });
  },
  removeUserTrackedSkin: (steamid: string, skin: STSkin) => {
    return db?.execute({
      sql: "DELETE FROM tracked_skins WHERE steamid = ? AND item = ? AND name = ? AND category = ? AND exterior = ? AND phase = ?",
      args: [
        steamid,
        skin.item,
        skin.name,
        skin.category,
        skin.exterior,
        skin.phase ?? null,
      ],
    });
  },
};

export default db;
