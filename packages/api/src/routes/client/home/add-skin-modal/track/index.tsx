import { setJSONAsContentType } from "@/hooks";
import { STGenericError, STGenericErrorType } from "@/utils/error";
import logger from "@/utils/logging";
import { AponiaCtxExtended } from "@/utils/types/context";
import {
  Gloves,
  GlovesSkins,
  Knife,
  KnifeSkins,
  STSkin,
  STSkinCategory,
  STSkinExterior,
  STUser,
  Weapon,
  WeaponSkins,
} from "@skintracker/types/src";
import {
  AponiaCtx,
  AponiaHooks,
  AponiaRouteHandler,
  AponiaRouteHandlerFn,
} from "aponia";

export interface AddUserTrackingFormBody {
  skin: string;
  exterior: string;
  category: string;
}

export const addUserTracking: AponiaRouteHandlerFn<
  Promise<string | STGenericError>
> = async (ctx: AponiaCtx): Promise<string | STGenericError> => {
  const { body, jwt, set } = ctx as AponiaCtxExtended;
  const user = await jwt.verify<STUser>(ctx.cookie.auth);

  if (!user) {
    const error = STGenericErrorType.Unauthorized;
    set.status = error;
    return {
      error,
      message: "Unauthorized",
    };
  }

  const formData = body as AddUserTrackingFormBody;
  const skinStringParts = formData.skin.split("|");

  const skin: STSkin = {
    item: skinStringParts[0].trim() as Gloves | Knife | Weapon,
    name: skinStringParts[1].trim() as GlovesSkins | KnifeSkins | WeaponSkins,
    exterior: formData.exterior as STSkinExterior,
    category: formData.category as STSkinCategory,
  } as STSkin;

  logger.info({ user, skin });
  return "";
};

export const addUserTrackingHooks: AponiaHooks = {
  afterHandle: [setJSONAsContentType],
};

export const handler: AponiaRouteHandler = {
  POST: {
    fn: addUserTracking,
    hooks: addUserTrackingHooks,
  },
};
