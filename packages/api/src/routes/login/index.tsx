import { BaseLayout } from "@/layouts/base";
import { captureException } from "@/utils/sentry";
import { AponiaCtx, AponiaRouteHandler, AponiaRouteHandlerFn } from "aponia";

export const getIndex: AponiaRouteHandlerFn<JSX.Element> = (
  _ctx: AponiaCtx
) => {
  return (
    <BaseLayout title="Home">
      <div>
        <h1 class="text-2xl font-semibold">Login</h1>
      </div>
    </BaseLayout>
  );
};

export const handler: AponiaRouteHandler = {
  GET: [captureException(getIndex)],
};
