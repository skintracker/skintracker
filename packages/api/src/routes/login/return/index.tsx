import { setHTMLAsContentType } from "@/hooks";
import BaseLayout from "@/layouts/base";
import SplashLayout from "@/layouts/splash";
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

  const user = {
    steamId,
    avatar: userData.response.players[0].avatarfull,
    displayName: userData.response.players[0].personaname,
  };

  setCookie("auth", await jwt.sign(user), {
    httpOnly: true,
    maxAge: 86400 * 7,
  });

  return (
    <SplashLayout title="Login Success" user={user}>
      <div class="py-40 bg-[linear-gradient(135deg,#6C66C9_0%,#F97C73_100%)] bg-[length:200%_200%] animate-[gradient_15s_ease-in-out_infinite] full-height">
        <h1 class="text-5xl font-bold text-center text-white">
          <img
            alt="Counter-Strike 2 Logo"
            src={user.avatar}
            class="w-32 mx-auto mb-4 rounded-md"
          />
          Welcome to Skintracker
        </h1>
        <h2 class="text-3xl font-bold text-center text-white mt-4" safe>
          {user.displayName} logged in.
        </h2>
        <p class="text-center mt-16">
          <a href="/" class="text-white underline underline-offset-8">
            go to dashboard →
          </a>
        </p>
      </div>
      <style>
        {`@keyframes gradient {
            0% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
            100% {
              background-position: 0% 50%;
            }
          }
          .full-height {
            height: calc(100vh - 74px);
          }
        `}
      </style>
    </SplashLayout>
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
