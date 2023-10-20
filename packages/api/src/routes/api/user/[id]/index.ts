import { deriveSentryTransaction, finishSentryTransaction, setJSONAsContentType } from "@/hooks";
import { captureException } from "@/utils/sentry";
import type { STUser } from "@skintracker/types/src";
import type { AponiaCtx, AponiaHooks, AponiaRouteHandler, AponiaRouteHandlerFn } from "aponia";

export const getUser: AponiaRouteHandlerFn<STUser> = (ctx: AponiaCtx) => {
  const { id } = ctx.params;
  return { steamid: id, tracking: [] };
};

export const getUserHooks: AponiaHooks = {
  afterHandle: [setJSONAsContentType, finishSentryTransaction],
};

export const handler: AponiaRouteHandler = {
  GET: {
    fn: captureException(getUser),
    hooks: getUserHooks,
    derivedState: [deriveSentryTransaction],
  },
};
