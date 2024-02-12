import { gzipEncode } from "@/hooks";
import {
  AponiaCtx,
  AponiaHooks,
  AponiaRouteHandler,
  AponiaRouteHandlerFn,
} from "aponia";

export const getPublicAsset: AponiaRouteHandlerFn<void> = async (
  ctx: AponiaCtx,
) => {
  const file = Bun.file(`${process.cwd()}/public/${ctx.params["*"]}`);
  ctx.set.headers["Content-Type"] = file.type;
  const fileContents = await file.text();
  return fileContents;
};

export const getPublicAssetHooks: AponiaHooks = {
  afterHandle: [gzipEncode],
};

export const handler: AponiaRouteHandler = {
  GET: {
    fn: getPublicAsset,
    hooks: getPublicAssetHooks,
  },
};
