import { Aponia } from "aponia";
import { dirname } from "path";

const start = performance.now();
const moduleDir = dirname(Bun.fileURLToPath(new URL(import.meta.url)));
const app = new Aponia({ routesDir: `${moduleDir}/routes` });

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
