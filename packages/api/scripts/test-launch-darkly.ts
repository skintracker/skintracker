import { basicLogger, init } from "@launchdarkly/node-server-sdk";

console.log("Initializing LaunchDarkly client...");
const client = init(Bun.env.LAUNCHDARKLY_SDK_KEY!, {
	logger: basicLogger({
		level: "debug",
		destination: console.log,
	}),
	application: {
		id: "skintracker-api",
		version: Bun.env.npm_package_version,
	},
});
const initializedClient = await client.waitForInitialization();
console.log("Initialized LaunchDarkly client.");
initializedClient.close();
console.log("Closed LaunchDarkly client.");
