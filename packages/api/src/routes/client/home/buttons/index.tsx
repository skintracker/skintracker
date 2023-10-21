import { setHTMLAsContentType } from "@/hooks";
import type { AponiaCtx, AponiaHooks, AponiaRouteHandler, AponiaRouteHandlerFn } from "aponia";

export function toggleClickState() {
  let clicked = false;
  return () => {
    clicked = !clicked;
    return clicked;
  };
}

const clickState = toggleClickState();

export const toggleButton: AponiaRouteHandlerFn<JSX.Element> = (_ctx: AponiaCtx) => {
  const text = clickState() ? "Clicked! (Do it again!)" : "Click me!";
  return <h1>{text}</h1>;
};

export const toggleButtonHooks: AponiaHooks = {
  afterHandle: [setHTMLAsContentType],
};

export const handler: AponiaRouteHandler = {
  POST: {
    fn: toggleButton,
    hooks: toggleButtonHooks,
  },
};
