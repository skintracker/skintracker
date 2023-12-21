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
  const item =
    skinStringParts[0].indexOf("★ ") !== -1
      ? (skinStringParts[0].substring(1).trim() as Gloves | Knife | Weapon)
      : (skinStringParts[0].trim() as Gloves | Knife | Weapon);
  const initialName = skinStringParts[1]
    .trim()
    .substring(0, skinStringParts[1].indexOf("(") - 2);
  const name =
    skinStringParts[1].indexOf("Doppler") !== -1
      ? initialName.substring(0, skinStringParts[1].indexOf("Phase") - 1).trim()
      : initialName;

  const skin: STSkin = {
    item,
    name: name as GlovesSkins | KnifeSkins | WeaponSkins,
    exterior: formData.exterior as STSkinExterior,
    category: formData.category as STSkinCategory,
  } as STSkin;

  if (skin.name.indexOf("Doppler") !== -1) {
    skin.phase = +initialName.substring(initialName.indexOf("Phase") + 6) as
      | 1
      | 2
      | 3
      | 4;
  }

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
