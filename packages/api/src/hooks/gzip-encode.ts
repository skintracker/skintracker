import { AponiaAfterRequestCtx } from "@/utils/types/context";
import { AponiaAfterRequestHandler } from "aponia/src";

export const gzipEncode: AponiaAfterRequestHandler = ({
  response,
  set,
}: AponiaAfterRequestCtx) => {
  const isJson = typeof response === "object";
  const text = isJson ? JSON.stringify(response) : response?.toString() ?? "";

  set.headers["Content-Encoding"] = "gzip";
  if (isJson) {
    set.headers["Content-Type"] = "application/json; charset=utf-8";
  }

  return new Response(Bun.gzipSync(new TextEncoder("utf-8").encode(text)));
};

export default gzipEncode;
