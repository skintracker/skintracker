import type {
  AponiaAfterRequestHandler,
  AponiaCtx,
  AponiaHooks,
  AponiaRouteHandler,
  AponiaRouteHandlerFn,
} from "aponia";

export const clickHomepageLogin: AponiaRouteHandlerFn<JSX.Element> = (
  ctx: AponiaCtx
) => {
  return <h1>Clicked!</h1>;
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
