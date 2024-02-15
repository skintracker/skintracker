import { gzipEncode, setHTMLAsContentType } from "@/hooks";
import { renderSkinsTableRows } from "@/utils/client/render-skins-table-rows";
import logger from "@/utils/logging";
import { AponiaCtxExtended } from "@/utils/types/context";
import { getTracking } from "@/utils/user";
import { STSkin, STUser } from "@skintracker/types/src";
import {
  AponiaCtx,
  AponiaHooks,
  AponiaRouteHandler,
  AponiaRouteHandlerFn,
} from "aponia";

export const getTableRows: AponiaRouteHandlerFn<Promise<string>> = async (
  ctx: AponiaCtx,
) => {
  const { cookie, jwt } = ctx as AponiaCtxExtended;
  const user = await jwt.verify<STUser>(cookie.auth);

  let skins: STSkin[] = [];
  try {
    const res = await getTracking(user.steamId);
    skins = res.items;
  } catch (e) {
    logger.debug(e);
  }

  const tableRows = await renderSkinsTableRows(skins);
  if (Array.isArray(tableRows)) {
    return tableRows.join("");
  }

  return tableRows;
};

export const getTableRowsHooks: AponiaHooks = {
  afterHandle: [setHTMLAsContentType, gzipEncode],
};

export const handler: AponiaRouteHandler = {
  GET: {
    fn: getTableRows,
    hooks: getTableRowsHooks,
  },
};
