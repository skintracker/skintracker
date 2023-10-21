import { setHTMLAsContentType } from "@/hooks";
import { BaseLayout } from "@/layouts/base";
import { AponiaCtx, AponiaHooks, AponiaRouteHandler, AponiaRouteHandlerFn } from "aponia";

export const getLogin: AponiaRouteHandlerFn<JSX.Element> = (_ctx: AponiaCtx) => {
  return (
    <BaseLayout title="Home">
      <div>
        <h1 class="text-2xl font-semibold">Login</h1>
      </div>
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
