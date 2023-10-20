import { startTransaction } from "@sentry/bun";
import { Aponia, type AponiaCtx } from "aponia";

export async function deriveSentryTransaction(ctx: AponiaCtx) {
  const { headers, method, url } = ctx.request;
  const urlObj = new URL(url);
  const path = urlObj.pathname;
  let body = undefined;
  try {
    if (ctx.request.body) {
      body = await ctx.request.json();
    }
  } catch (e) {
    Aponia.log("🔥 Couldn't parse request body!");
  }
  const transactionInit = {
    name: `${method} ${path}`,
    metadata: {
      request: {
        method,
        url,
        baseUrl: urlObj.origin,
        host: urlObj.host,
        hostname: urlObj.hostname,
        headers: headers.toJSON(),
        body,
        protocol: "http",
        query: urlObj.searchParams,
      },
    },
  };
  if (Bun.env.NODE_ENV === "production") {
    const transaction = startTransaction(transactionInit);
    return { transaction };
  } else {
    Aponia.log("🔥 Sentry is disabled!");
    console.log("transactionInit", transactionInit);
    return {};
  }
}
