import { createClient } from "@libsql/client";

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
			sql: "SELECT item, name, category, exterior FROM tracked_skins WHERE steamid = ?",
			args: [steamid],
		});
	},
};

export default db;
