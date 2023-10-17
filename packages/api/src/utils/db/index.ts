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

export default db;
