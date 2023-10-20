import { deriveSentryTransaction } from "@/hooks";
import { Elysia } from "elysia";

export const plugin = new Elysia().derive(deriveSentryTransaction);
