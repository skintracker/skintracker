import { setJSONAsContentType } from "@/hooks";
import { queries } from "@/utils/db";
import { STGenericError, STGenericErrorType } from "@/utils/error";
import logger from "@/utils/logging";
import { AponiaCtxExtended } from "@/utils/types/context";
import { getTracking } from "@/utils/user";
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

  try {
    const res = await getTracking(id);
    return res;
  } catch (e) {
    const error = STGenericErrorType.TursoError;
    set.status = error;
    return {
      error,
      message: "TursoError: Invalid or no response from Turso!",
    };
  }
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
  const { item, name, category, exterior } = ctx.body as STSkin;
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
    items: [ctx.body as STSkin],
  };
};

export const getUserTrackingHooks: AponiaHooks = {
  afterHandle: [setJSONAsContentType],
};

export const addUserTrackingHooks: AponiaHooks = {
  afterHandle: [setJSONAsContentType],
};

export const handler: AponiaRouteHandler = {
  GET: {
    fn: getUserTracking,
    hooks: getUserTrackingHooks,
  },
  POST: {
    fn: addUserTracking,
    hooks: addUserTrackingHooks,
  },
};
