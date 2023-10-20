import {
	captureException as sentryCapture,
	startTransaction,
} from "@sentry/bun";
import type { AponiaRouteHandlerFn } from "aponia/src";

export function captureException(fn: AponiaRouteHandlerFn, name?: string) {
	const routeHandler = fn;
	if (Bun.env.NODE_ENV !== "production") return routeHandler;
	return (...args: Parameters<AponiaRouteHandlerFn>) => {
		const tx = startTransaction({
			op: "api-request",
			name: name ?? routeHandler.name,
		});
		try {
			return routeHandler(...args);
		} catch (e) {
			sentryCapture(e);
			throw e;
		} finally {
			tx.finish();
		}
	};
}
