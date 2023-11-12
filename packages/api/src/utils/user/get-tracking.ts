import { STSkin } from "@skintracker/types/src";
import { queries } from "../db";
import { STGenericErrorType } from "../error";
import { intToCategory, intToExterior } from "../type-conversion";

export async function getTracking(userId: string) {
  const res = await queries.getUserTrackedSkins(userId);
  if (!res) {
    throw new Error(STGenericErrorType.TursoError.toString());
  }

  return {
    items: res.rows.map(
      (row) =>
        ({
          item: row[0],
          name: row[1],
          category: intToCategory(row[2] as number),
          exterior: intToExterior(row[3] as number),
          phase: row[4] as number | null,
        }) as STSkin,
    ),
  };
}
