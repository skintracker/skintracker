import { setJSONAsContentType } from "@/hooks";
import type {
  AponiaCtx,
  AponiaDecorator,
  AponiaHooks,
  AponiaRouteHandler,
  AponiaRouteHandlerFn,
} from "aponia";

export const getDateDecorator: AponiaDecorator = ["getDate", () => Date.now()];

export const getHealthcheck: AponiaRouteHandlerFn<{
  status: string;
  timestamp: number;
}> = (ctx: AponiaCtx) => {
  const decoratedCtx = ctx as AponiaCtx & {
    getDate: () => Date;
  };
  return {
    status: "ok",
    timestamp: +decoratedCtx.getDate(),
  };
};

export const getHealthcheckHooks: AponiaHooks = {
  afterHandle: [setJSONAsContentType],
};

export const handler: AponiaRouteHandler = {
  GET: {
    fn: getHealthcheck,
    hooks: getHealthcheckHooks,
    decorators: [getDateDecorator],
  },
};
