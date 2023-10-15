import db from "@/utils/db";
import { randomUUID } from "crypto";

await db?.execute(
	"CREATE TABLE IF NOT EXISTS tracked_skins (id text primary key, steamid text, exterior integer, category integer, item text, name text);",
);
await db?.execute({
	sql: `INSERT INTO tracked_skins VALUES (?, ?, ?, ?, ?, ?);`,
	args: [randomUUID(), "76561198118324737", 0, 1, "Bayonet", "Doppler"],
});
