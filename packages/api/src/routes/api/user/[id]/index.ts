import { setJSONAsContentType } from "@/hooks";
import type { STUser } from "@skintracker/types/src";
import type { AponiaCtx, AponiaHooks, AponiaRouteHandler, AponiaRouteHandlerFn } from "aponia";

export const getUser: AponiaRouteHandlerFn<STUser> = (ctx: AponiaCtx) => {
  const { id } = ctx.params;
  return { steamid: id, tracking: [] };
};

export const getUserHooks: AponiaHooks = {
  afterHandle: [setJSONAsContentType],
};

export const handler: AponiaRouteHandler = {
  GET: {
    fn: getUser,
    hooks: getUserHooks,
  },
};
