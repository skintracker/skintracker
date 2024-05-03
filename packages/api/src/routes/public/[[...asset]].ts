import { gzipEncode } from "@/hooks";
import { fileCache } from "@/utils/cache";
import {
  AponiaCtx,
  AponiaHooks,
  AponiaRouteHandler,
  AponiaRouteHandlerFn,
} from "aponia";

const MAX_AGE = 604800; // 1 week
const DEFAULT_CACHE_CONTROL = `public, max-age=${MAX_AGE}`;

export const getPublicAsset: AponiaRouteHandlerFn<void> = async (
  ctx: AponiaCtx,
) => {
  const { params, set } = ctx;
  const fileName = params["*"];

  const cachedData = fileCache.get(fileName);

  if (Bun.env.NODE_ENV !== "development")
    set.headers["Cache-Control"] = DEFAULT_CACHE_CONTROL;

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
