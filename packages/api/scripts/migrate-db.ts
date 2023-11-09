import db from "@/utils/db";

await db?.execute(
  `ALTER TABLE tracked_skins
  ADD COLUMN phase INTEGER;
  `,
);

console.log("Migrated db successfully!");
