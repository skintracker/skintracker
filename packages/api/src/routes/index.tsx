import { captureException } from "@/utils/sentry";
import { AponiaCtx, AponiaRouteHandler, AponiaRouteHandlerFn } from "aponia";
import { getHealthcheck } from "./api/healthcheck";
import { BaseLayout } from "@/layouts/base";
import { Button } from "@/components/button";

export const getIndex: AponiaRouteHandlerFn<JSX.Element> = (
  _ctx: AponiaCtx
) => {
  const healthcheckRes = getHealthcheck(_ctx);
  return (
    <BaseLayout>
      <div>
        <h1>Hello World</h1>
        <img alt="POG" src="/public/test-img.png" />
        <p>Healthcheck: {JSON.stringify(healthcheckRes)}</p>
        <Button text="Login" onClickRoute="/client/home/buttons" />
      </div>
    </BaseLayout>
  );
};

export const handler: AponiaRouteHandler = {
  GET: [captureException(getIndex)],
};
