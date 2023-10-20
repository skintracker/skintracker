import * as Sentry from "@sentry/bun";
import type { AponiaRouteHandlerFn } from "aponia/src";

export function captureException(fn: AponiaRouteHandlerFn) {
	const routeHandler = fn;
	if (Bun.env.NODE_ENV !== "production") return routeHandler;
	return (...args: Parameters<AponiaRouteHandlerFn>) => {
		try {
			return routeHandler(...args);
		} catch (e) {
			Sentry.captureException(e);
			throw e;
		}
	};
}
