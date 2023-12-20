import { setHTMLAsContentType } from "@/hooks";
import { renderSkinsTableRows } from "@/utils/client/render-skins-table-rows";
import { queries } from "@/utils/db";
import { STGenericError, STGenericErrorType } from "@/utils/error";
import logger from "@/utils/logging";
import { AponiaCtxExtended } from "@/utils/types/context";
import { getTracking } from "@/utils/user";
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
  hasSkins: string;
}

export const removeUserTracking: AponiaRouteHandlerFn<
  Promise<string | JSX.Element[] | STGenericError>
> = async (
  ctx: AponiaCtx,
): Promise<string | JSX.Element[] | STGenericError> => {
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
    name: skinStringParts[1]
      .trim()
      .substring(0, skinStringParts[1].indexOf("(") - 2) as
      | GlovesSkins
      | KnifeSkins
      | WeaponSkins,
    exterior: formData.exterior as STSkinExterior,
    category: formData.category as STSkinCategory,
  } as STSkin;

  try {
    const res = await queries.removeUserTrackedSkin(user.steamId, skin);
    if (!res) {
      const error = STGenericErrorType.TursoError;
      set.status = error;
      return {
        error,
        message: "TursoError: Invalid or no response from Turso!",
      };
    }
  } catch (e) {
    logger.warn(e);
  }

  let skins: STSkin[] = [];
  try {
    const res = await getTracking(user.steamId);
    skins = res.items;
  } catch (e) {
    logger.warn(e);
  }

  const tableRows = await renderSkinsTableRows(skins);

  return Array.isArray(tableRows)
    ? (tableRows.join("") as string)
    : (tableRows as string);
};

export const removeUserTrackingHooks: AponiaHooks = {
  afterHandle: [setHTMLAsContentType],
};

export const handler: AponiaRouteHandler = {
  POST: {
    fn: removeUserTracking,
    hooks: removeUserTrackingHooks,
  },
};
