import { setHTMLAsContentType } from "@/hooks";
import { renderSkinsTableRows } from "@/utils/client/render-skins-table-rows";
import { queries } from "@/utils/db";
import { STGenericError, STGenericErrorType } from "@/utils/error";
import logger from "@/utils/logging";
import { AponiaCtxExtended } from "@/utils/types/context";
import { getTracking } from "@/utils/user";
import {
  GlovesSkins,
  KnifeSkins,
  STSkin,
  STSkinCategory,
  STSkinExterior,
  STUser,
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

  let item = skinStringParts[0].trim();
  if (item.indexOf("★ ") !== -1) {
    item = item.substring(1).trim();
  }
  let category: STSkinCategory = STSkinCategory.Normal;
  if (item.startsWith("Souvenir")) {
    item = item.substring(8).trim();
    category = STSkinCategory.Souvenir;
  }
  if (item.startsWith("StatTrak™")) {
    item = item.substring(9).trim();
    category = STSkinCategory.StatTrak;
  }
  const wearString = skinStringParts[1].substring(
    skinStringParts[1].indexOf("(") + 1,
    skinStringParts[1].indexOf(")"),
  );
  let exterior: STSkinExterior = STSkinExterior.FN;
  switch (wearString) {
    case "Factory New":
      exterior = STSkinExterior.FN;
      break;
    case "Minimal Wear":
      exterior = STSkinExterior.MW;
      break;
    case "Field-Tested":
      exterior = STSkinExterior.FT;
      break;
    case "Well-Worn":
      exterior = STSkinExterior.WW;
      break;
    default:
      exterior = STSkinExterior.BS;
      break;
  }

  let name: string | undefined = undefined;
  const initialName = skinStringParts[1]
    .trim()
    .substring(0, skinStringParts[1].indexOf("(") - 2);
  name = initialName;
  if (name.indexOf("Doppler") !== -1) {
    name = name.substring(0, skinStringParts[1].indexOf("Phase") - 1).trim();
  }

  const skin: STSkin = {
    item,
    name: name as GlovesSkins | KnifeSkins | WeaponSkins,
    exterior,
    category,
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
