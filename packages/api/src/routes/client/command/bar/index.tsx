import { CommandBar } from "@/components/command-bar";
import { gzipEncode, setHTMLAsContentType } from "@/hooks";
import type {
  AponiaCtx,
  AponiaHooks,
  AponiaRouteHandler,
  AponiaRouteHandlerFn,
} from "aponia";

export const showCommandBar: AponiaRouteHandlerFn<JSX.Element> = (
  _ctx: AponiaCtx,
) => {
  return <CommandBar />;
};

export const showCommandBarHooks: AponiaHooks = {
  afterHandle: [setHTMLAsContentType, gzipEncode],
};

export const handler: AponiaRouteHandler = {
  GET: {
    fn: showCommandBar,
    hooks: showCommandBarHooks,
  },
};
