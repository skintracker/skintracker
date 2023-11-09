import db from "@/utils/db";
import { randomUUID } from "crypto";

if (!Bun.env.STEAMID64) {
  throw new Error("STEAMID64 env variable is not set!");
}

await db?.execute(
  "CREATE TABLE IF NOT EXISTS tracked_skins (id text primary key, steamid text, exterior integer, category integer, item text, name text, phase integer);",
);
await db?.execute({
  sql: "INSERT INTO tracked_skins VALUES (?, ?, ?, ?, ?, ?, ?);",
  args: [randomUUID(), Bun.env.STEAMID64, 0, 1, "Bayonet", "Doppler", 1],
});

console.log("Completed db seeding successfully!");
