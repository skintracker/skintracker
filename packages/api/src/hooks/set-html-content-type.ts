import { AponiaCtx } from "aponia/src";

export function setHTMLAsContentType({ set }: Pick<AponiaCtx, "set">) {
  set.headers["Content-Type"] = "text/html";
}
