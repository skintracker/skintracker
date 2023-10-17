import type {
  AponiaAfterRequestHandler,
  AponiaCtx,
  AponiaHooks,
  AponiaRouteHandler,
  AponiaRouteHandlerFn,
} from "aponia";

export function toggleClickState() {
  let clicked = false;
  return () => {
    clicked = !clicked;
    return clicked;
  };
}

const clickState = toggleClickState();

export const clickHomepageLogin: AponiaRouteHandlerFn<JSX.Element> = (
  ctx: AponiaCtx
) => {
  const text = clickState() ? "Clicked! (Do it again!)" : "Click me!";
  return <h1>{text}</h1>;
};

export const postClickHomepageLogin: AponiaAfterRequestHandler = ({
  set,
}: // biome-ignore lint/suspicious/noExplicitAny: set is of unknown type, but we don't care
any) => {
  set.headers["Content-Type"] = "text/html";
};

export const clickHomepageLoginHooks: AponiaHooks = {
  afterHandle: [postClickHomepageLogin],
};

export const handler: AponiaRouteHandler = {
  POST: [clickHomepageLogin, clickHomepageLoginHooks],
};
