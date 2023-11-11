import { setHTMLAsContentType } from "@/hooks";
import BaseLayout from "@/layouts/base";
import { JsonHighlighter } from "@/utils/client";
import { getPlayerSummaries } from "@/utils/steam";
import { AponiaCtxExtended } from "@/utils/types/context";
import {
  AponiaCtx,
  AponiaHooks,
  AponiaRouteHandler,
  AponiaRouteHandlerFn,
} from "aponia";

export const getLoginFailure = (query: unknown) => (
  <BaseLayout title="Login Result">
    <p>Login Failure</p>
    <JsonHighlighter data={query} />
  </BaseLayout>
);

export const getLogin: AponiaRouteHandlerFn<Promise<string>> = async (
  ctx: AponiaCtx,
) => {
  const { query } = ctx;

  const expectedValues = {
    "openid.ns": "http://specs.openid.net/auth/2.0",
    "openid.op_endpoint": "https://steamcommunity.com/openid/login",
  };

  const identityRegex = /^https?:\/\/steamcommunity\.com\/openid\/id\/(\d+)$/;

  if (
    query["openid.ns"] !== expectedValues["openid.ns"] ||
    !query["openid.claimed_id"] ||
    !identityRegex.test(query["openid.claimed_id"]) ||
    query["openid.op_endpoint"] !== expectedValues["openid.op_endpoint"] ||
    !query["openid.identity"] ||
    !identityRegex.test(query["openid.identity"])
  ) {
    return getLoginFailure(query);
  }

  // biome-ignore lint/style/noNonNullAssertion: This is checked above
  const steamId = query["openid.identity"].match(identityRegex)![1];

  if (!steamId) return getLoginFailure(query);
  const userData = await getPlayerSummaries(steamId);

  const { setCookie, jwt } = ctx as AponiaCtxExtended;

  setCookie(
    "auth",
    await jwt.sign({
      steamId,
      avatar: userData.response.players[0].avatarfull,
      displayName: userData.response.players[0].personaname,
    }),
    {
      httpOnly: true,
      maxAge: 86400 * 7,
    },
  );

  return (
    <BaseLayout title="Login Result">
      <p>Login Success</p>
      <JsonHighlighter data={userData} />
    </BaseLayout>
  );
};

export const getLoginHooks: AponiaHooks = {
  afterHandle: [setHTMLAsContentType],
};

export const handler: AponiaRouteHandler = {
  GET: {
    fn: getLogin,
    hooks: getLoginHooks,
  },
};
