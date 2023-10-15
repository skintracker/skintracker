import { captureException } from "@/utils/sentry";
import { AponiaCtx, AponiaRouteHandler, AponiaRouteHandlerFn } from "aponia";
import { getHealthcheck } from "./api/healthcheck";

export const getIndex: AponiaRouteHandlerFn<JSX.Element> = (
  _ctx: AponiaCtx
) => {
  const healthcheckRes = getHealthcheck(_ctx);
  return (
    <html lang="en">
      <head>
        <title>Skintracker</title>
        <script src="/public/js/htmx.js" />
        <script src="/public/js/tailwind.js" />
      </head>
      <body>
        <div>
          <h1>Hello World</h1>
          <img alt="POG" src="/public/test-img.png" />
          <p>Healthcheck: {JSON.stringify(healthcheckRes)}</p>
        </div>
      </body>
    </html>
  );
};

export const handler: AponiaRouteHandler = {
  GET: [captureException(getIndex)],
};
