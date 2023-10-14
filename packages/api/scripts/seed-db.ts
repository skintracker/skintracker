import db from "@/utils/db";
import { randomUUID } from "crypto";

await db?.execute(
	"CREATE TABLE IF NOT EXISTS tracked_skins (id text primary key, steamid text, exterior integer, category integer, item text, name text);",
);
await db?.execute(
	`INSERT INTO tracked_skins VALUES (${randomUUID()}, '76561198065741354', 0, 1, 'Bayonet', 'Doppler');`,
);
