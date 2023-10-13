import db from "@/utils/db";

await db?.execute(
	"CREATE TABLE IF NOT EXISTS tracked_skins (id text primary key, steamid text, exterior integer, category integer, item text, name text);",
);
await db?.execute(
	"INSERT INTO tracked_skins VALUES ('96fead22-d71a-4bbc-946d-fb1cbc8114a3', '76561198118324737', 0, 2, 'AK-47', 'Wild Lotus');",
);
