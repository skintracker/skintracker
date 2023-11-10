import { AponiaCtxExtended } from "@/utils/types/context";
import { AponiaCtx, AponiaRouteHandler, AponiaRouteHandlerFn } from "aponia";

export const getLogin: AponiaRouteHandlerFn<void> = (ctx: AponiaCtx) => {
  const { removeCookie, set } = ctx as AponiaCtxExtended;

  removeCookie("auth");
  set.redirect = "/";
};

export const handler: AponiaRouteHandler = {
  GET: {
    fn: getLogin,
  },
};
