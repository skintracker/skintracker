import type { Transaction } from "@sentry/bun";
import { Aponia, type AponiaCtx } from "aponia";

export function finishSentryTransaction(ctx: AponiaCtx) {
  Aponia.log("🔥 Finishing Sentry transaction...");
  if (Bun.env.NODE_ENV === "production") {
    const { transaction } = ctx as AponiaCtx & { transaction: Transaction };
    transaction.finish();
  } else {
    Aponia.log("🔥 Sentry is disabled!");
  }
}
