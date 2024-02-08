import { setHTMLAsContentType } from "@/hooks";
import SplashLayout from "@/layouts/splash";
import { AponiaCtxExtended } from "@/utils/types/context";
import {
  AponiaCtx,
  AponiaHooks,
  AponiaRouteHandler,
  AponiaRouteHandlerFn,
} from "aponia";

export const getLogoutSuccess: AponiaRouteHandlerFn<Promise<string>> = async (
  ctx: AponiaCtx,
) => {
  const { cookie, set } = ctx as AponiaCtxExtended;
  if (cookie.auth) {
    set.redirect = "/";
  }

  return (
    <SplashLayout title="Logout Success">
      <div class="py-40 bg-[linear-gradient(135deg,#6C66C9_0%,#F97C73_100%)] bg-[length:200%_200%] animate-[gradient_15s_ease-in-out_infinite] full-height">
        <h1 class="text-5xl font-bold text-center text-white">
          See you later!
        </h1>
        <h2 class="text-3xl font-bold text-center text-white mt-4" safe>
          You have been successfully logged out.
        </h2>
        <p class="text-center mt-16">
          <a href="/" class="text-white underline underline-offset-8">
            close 󰅖
          </a>
        </p>
      </div>
    </SplashLayout>
  );
};

export const getLogoutSuccessHooks: AponiaHooks = {
  afterHandle: [setHTMLAsContentType],
};

export const handler: AponiaRouteHandler = {
  GET: {
    fn: getLogoutSuccess,
    hooks: getLogoutSuccessHooks,
  },
};
