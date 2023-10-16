import db from "@/utils/db";

export default (steamid: string) => {
  return db?.execute({
    sql: "SELECT item, name, category, exterior FROM tracked_skins WHERE steamid = ?",
    args: [steamid],
  });
};
