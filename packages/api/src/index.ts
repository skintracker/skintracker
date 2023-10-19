import { dirname } from "path";
import { html } from "@elysiajs/html";
import { staticPlugin } from "@elysiajs/static";
import * as Sentry from "@sentry/bun";
import { Aponia, AponiaPlugin } from "aponia";

const start = performance.now();
const moduleDir = dirname(Bun.fileURLToPath(new URL(import.meta.url)));
const app = new Aponia({
	routesDir: `${moduleDir}/routes`,
	plugins: [html(), staticPlugin() as unknown as AponiaPlugin],
});

if (Bun.env.NODE_ENV === "production") {
	Sentry.init({
		// Performance Monitoring
		tracesSampleRate: 1.0, // Capture 100% of the transactions
		integrations: [new Sentry.Integrations.Http({ tracing: true })],
	});
}

await app.start().then(
	(instance) => {
		const end = performance.now();
		const timeToStart = end - start;
		Aponia.log(
			`🐎 Aponia started: ${instance.server?.hostname}:${instance.server?.port} (${timeToStart}ms)`,
		);
	},
	(reason) => console.error(`Couldn't boostrap Aponia!\nreason: ${reason}`),
);
