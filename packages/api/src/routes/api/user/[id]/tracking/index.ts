import { setJSONAsContentType } from "@/hooks";
import { queries } from "@/utils/db";
import { STGenericError, STGenericErrorType } from "@/utils/error";
import logger from "@/utils/logging";
import { intToCategory, intToExterior } from "@/utils/type-conversion";
import { AponiaCtxExtended } from "@/utils/types/context";
import type { STSkin, STUser } from "@skintracker/types/src";
import type {
  AponiaCtx,
  AponiaHooks,
  AponiaRouteHandler,
  AponiaRouteHandlerFn,
} from "aponia";

export interface UserTrackingResponse {
  items: STSkin[];
}

export const getUserTracking: AponiaRouteHandlerFn<
  Promise<UserTrackingResponse | STGenericError>
> = async (ctx: AponiaCtx): Promise<UserTrackingResponse | STGenericError> => {
  const { jwt, set } = ctx as AponiaCtxExtended;
  const user = await jwt.verify<STUser>(ctx.cookie.auth);

  if (!user) {
    const error = STGenericErrorType.Unauthorized;
    set.status = error;
    return {
      error,
      message: "Unauthorized",
    };
  }

  const { id } = ctx.params;
  logger.debug(`[GET] /user/${id}/tracking`);
  const res = await queries.getUserTrackedSkins(id);
  if (!res) {
    const error = STGenericErrorType.TursoError;
    set.status = error;
    return {
      error,
      message: "TursoError: Invalid or no response from Turso!",
    };
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
};

export const addUserTracking: AponiaRouteHandlerFn<
  Promise<UserTrackingResponse | STGenericError>
> = async (ctx: AponiaCtx): Promise<UserTrackingResponse | STGenericError> => {
  const { jwt, set } = ctx as AponiaCtxExtended;
  const user = await jwt.verify<STUser>(ctx.cookie.auth);

  if (!user) {
    const error = STGenericErrorType.Unauthorized;
    set.status = error;
    return {
      error,
      message: "Unauthorized",
    };
  }

  const { id } = ctx.params;
  const { item, name, category, exterior, phase } = ctx.body as STSkin;
  logger.debug(`[POST] /user/${id}/tracking`);
  if (!item || !name || !category || !exterior) {
    const error = STGenericErrorType.InternalServerError;
    set.status = error;
    return {
      error,
      message: "InternalServerError: Missing required fields!",
    };
  }
  const res = await queries.addUserTrackedSkin(id, ctx.body as STSkin);
  if (!res) {
    const error = STGenericErrorType.TursoError;
    set.status = error;
    return {
      error,
      message: "TursoError: Invalid or no response from Turso!",
    };
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
};

export const getUserTrackingHooks: AponiaHooks = {
  afterHandle: [setJSONAsContentType],
};

export const handler: AponiaRouteHandler = {
  GET: {
    fn: getUserTracking,
    hooks: getUserTrackingHooks,
  },
};
