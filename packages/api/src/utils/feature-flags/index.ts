import { Aponia } from "aponia";
import {
	init,
	basicLogger,
	type LDContext,
} from "@launchdarkly/node-server-sdk";

export async function initFFClient() {
	// There seems to be an issue where if NODE_ENV is set to production, the SDK
	// will never initialize.
	// if (Bun.env.NODE_ENV !== "production") return;
	if (!Bun.env.LAUNCHDARKLY_SDK_KEY) {
		Aponia.log("LAUNCHDARKLY_SDK_KEY is not set");
		return undefined;
	}
	Aponia.log("Initializing LaunchDarkly SDK...");
	const client = init(Bun.env.LAUNCHDARKLY_SDK_KEY, {
		logger: basicLogger({
			level: "debug",
			destination: Aponia.log,
		}),
		application: {
			id: "skintracker-api",
			version: Bun.env.npm_package_version,
		},
	});
	Aponia.log("Initialized LaunchDarkly client.");
	const initializedClient = await client.waitForInitialization();
	Bun.env.NODE_ENV = "production";
	return initializedClient;
}

export const ffClient = await initFFClient();

export async function devTrue(fn: () => Promise<any> | undefined) {
	if (Bun.env.NODE_ENV === "production") return fn();
	return true;
}

export async function defaultFalse(fn: () => Promise<any> | undefined) {
	if (!ffClient) return false;
	return fn();
}

export const featureFlags = {
	DB_ACCESS: (ctx: LDContext) =>
		devTrue(() =>
			defaultFalse(() => ffClient?.variation("ST_DB_ACCESS", ctx, false)),
		),
};

export default featureFlags;
