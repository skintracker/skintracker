import { gzipEncode } from "@/hooks";
import { fileCache } from "@/utils/cache";
import {
  AponiaCtx,
  AponiaHooks,
  AponiaRouteHandler,
  AponiaRouteHandlerFn,
} from "aponia";

export const getPublicAsset: AponiaRouteHandlerFn<void> = async (
  ctx: AponiaCtx,
) => {
  const { params, set } = ctx;
  const fileName = params["*"];

  const cachedData = fileCache.get(fileName);
  if (cachedData) {
    set.headers["Content-Type"] = cachedData.file.type;
    return cachedData.contents;
  }

  const file = Bun.file(`${process.cwd()}/public/${fileName}`);
  set.headers["Content-Type"] = file.type;
  const fileContents = fileCache.add(fileName, file);
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
