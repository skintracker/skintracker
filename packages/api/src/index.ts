import { networkInterfaces } from "os";
import { dirname } from "path";
import { html } from "@elysiajs/html";
import { staticPlugin } from "@elysiajs/static";
import { Integrations, init } from "@sentry/bun";
import { Aponia, AponiaPlugin } from "aponia";

const start = performance.now();
const moduleDir = dirname(Bun.fileURLToPath(new URL(import.meta.url)));
const app = new Aponia({
  routesDir: `${moduleDir}/routes`,
  plugins: [html(), staticPlugin() as unknown as AponiaPlugin],
});

if (Bun.env.NODE_ENV === "production") {
  Aponia.log("Initializing Sentry...");
  init({
    // Performance Monitoring
    tracesSampleRate: 1.0, // Capture 100% of the transactions
    integrations: [new Integrations.Http({ tracing: true })],
    dsn: Bun.env.SENTRY_DSN,
  });
  Aponia.log("🔥 Sentry is enabled!");
}

function getCurrentLocalIP() {
  const interfaces = networkInterfaces();
  const ips = Object.values(interfaces)?.flatMap((i) => i?.map((a) => a?.address));
  return ips?.filter((ip?: string) => ip?.startsWith("192.168"))[0];
}

await app.start().then(
  (instance) => {
    const end = performance.now();
    const timeToStart = end - start;
    Aponia.log(
      `🐎 Aponia started successfully! (${timeToStart.toFixed(4)}ms) \n\t\t\t 🖥️  Local: ${instance.server?.hostname}:${
        instance.server?.port
      } \n\t\t\t 🌐 Network: ${getCurrentLocalIP()}:${instance.server?.port}`,
    );
  },
  (reason) => console.error(`Couldn't boostrap Aponia!\nreason: ${reason}`),
);
