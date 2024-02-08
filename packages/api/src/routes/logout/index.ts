import { AponiaCtxExtended } from "@/utils/types/context";
import { AponiaCtx, AponiaRouteHandler, AponiaRouteHandlerFn } from "aponia";

export const getLogout: AponiaRouteHandlerFn<void> = (ctx: AponiaCtx) => {
  const { removeCookie, set } = ctx as AponiaCtxExtended;

  removeCookie("auth");
  set.redirect = "/logout/success";
};

export const handler: AponiaRouteHandler = {
  GET: {
    fn: getLogout,
  },
};
