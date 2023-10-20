import { finishSentryTransaction, setJSONAsContentType } from "@/hooks";
import { queries } from "@/utils/db";
import { captureException } from "@/utils/sentry";
import { intToCategory, intToExterior } from "@/utils/type-conversion";
import type { STSkin } from "@skintracker/types/src";
import { Aponia } from "aponia";
import type { AponiaCtx, AponiaHooks, AponiaRouteHandler, AponiaRouteHandlerFn } from "aponia";

export interface UserTrackingResponse {
  items: STSkin[];
}

export const getUserTracking: AponiaRouteHandlerFn<Promise<UserTrackingResponse>> = async (
  ctx: AponiaCtx,
): Promise<UserTrackingResponse> => {
  const { id } = ctx.params;
  Aponia.log(`[GET] /user/${id}/tracking test`);
  const res = await queries.getUserTrackedSkins(id);
  if (!res) {
    throw new Error("Invalid or no response from Turso!");
  }
  return {
    items: res.rows.map(
      (row) =>
        ({
          item: row[0],
          name: row[1],
          category: intToCategory(row[2] as number),
          exterior: intToExterior(row[3] as number),
        }) as STSkin,
    ),
  };
};

export const getUserTrackingHooks: AponiaHooks = {
  afterHandle: [setJSONAsContentType, finishSentryTransaction],
};

export const handler: AponiaRouteHandler = {
  GET: {
    fn: captureException(getUserTracking),
    hooks: getUserTrackingHooks,
  },
};
