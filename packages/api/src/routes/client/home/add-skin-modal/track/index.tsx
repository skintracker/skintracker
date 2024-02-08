import { gzipEncode, setHTMLAsContentType } from "@/hooks";
import { renderSkinsTableRows } from "@/utils/client/render-skins-table-rows";
import { queries } from "@/utils/db";
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
  phase?: 1 | 2 | 3 | 4;
  hasSkins: string;
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
    phase: formData.phase ? (+formData.phase as 1 | 2 | 3 | 4) : null,
  } as STSkin;

  try {
    const res = await queries.addUserTrackedSkin(user.steamId, skin);
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

  const tableRows: JSX.Element | JSX.Element[] = await renderSkinsTableRows([
    skin,
  ]);
  if (typeof tableRows === "string") {
    return tableRows;
  }
  return tableRows.length > 0 ? tableRows.join("") : "";
};

export const addUserTrackingHooks: AponiaHooks = {
  afterHandle: [setHTMLAsContentType, gzipEncode],
};

export const handler: AponiaRouteHandler = {
  POST: {
    fn: addUserTracking,
    hooks: addUserTrackingHooks,
  },
};
