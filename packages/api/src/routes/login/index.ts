import { AponiaCtx, AponiaRouteHandler, AponiaRouteHandlerFn } from "aponia";

export const getLogin: AponiaRouteHandlerFn<void> = (ctx: AponiaCtx) => {
  const steamLoginUrl = `
    https://steamcommunity.com/openid/login
    ?openid.ns=http://specs.openid.net/auth/2.0
    &openid.mode=checkid_setup
    &openid.return_to=${encodeURIComponent(
      "https://skintracker.io/login/return",
    )}
    &openid.realm=${encodeURIComponent("https://skintracker.io/")}
    &openid.identity=http://specs.openid.net/auth/2.0/identifier_select
    &openid.claimed_id=http://specs.openid.net/auth/2.0/identifier_select
  `.replace(/\s+/g, "");

  ctx.set.redirect = steamLoginUrl;
};

export const handler: AponiaRouteHandler = {
  GET: {
    fn: getLogin,
  },
};
