import { CommandBar } from "@/components/command-bar";
import { finishSentryTransaction, setHTMLAsContentType } from "@/hooks";
import { captureException } from "@/utils/sentry";
import type { AponiaCtx, AponiaHooks, AponiaRouteHandler, AponiaRouteHandlerFn } from "aponia";

export const showCommandBar: AponiaRouteHandlerFn<JSX.Element> = (_ctx: AponiaCtx) => {
  return <CommandBar />;
};

export const showCommandBarHooks: AponiaHooks = {
  afterHandle: [setHTMLAsContentType, finishSentryTransaction],
};

export const handler: AponiaRouteHandler = {
  GET: {
    fn: captureException(showCommandBar),
    hooks: showCommandBarHooks,
  },
};
