import db from "@/utils/db";
console.log("Turso token set:", !!Bun.env.TURSO_TOKEN);
console.log("Communicating via:", db?.protocol);
const res = await db?.execute("SELECT * FROM tracked_skins");
console.log("Received response!");
console.log(res?.toJSON());
