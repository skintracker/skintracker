import db from "@/utils/db";

console.log("Deleting record...");
console.log({ args: [Bun.env.STEAMID64 ?? "", 0, 1, "Bayonet", "Doppler", 1] });
const tx = await db?.transaction("write");
const res = await tx?.execute({
  sql: "DELETE FROM tracked_skins WHERE steamid = ? AND item = ? AND name = ? AND category = ? AND exterior = ?;",
  args: ["76561198118324737", "AK-47", "Aquamarine Revenge", 0, 0],
});
await tx?.commit().then(() => tx?.close());

console.log({ res });
