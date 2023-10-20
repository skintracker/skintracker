import { AponiaCtx } from "aponia/src";

export function setJSONAsContentType({ set }: Pick<AponiaCtx, "set">) {
  set.headers["Content-Type"] = "application/json";
}
