import { networkInterfaces } from "os";
import { performance } from "perf_hooks";

import logger from "@/utils/logging";
import { cookie } from "@elysiajs/cookie";
// DO NOT REMOVE ME!! I PROVIDE INTELLISENSE FOR THE WHOLE PROJECT
import { html } from "@elysiajs/html";
import { jwt } from "@elysiajs/jwt";
// END DO NOT REMOVE ME!!
// import { staticPlugin } from "@skintracker/elysia-static";
import { Aponia, AponiaPlugin } from "aponia";

if (!Bun.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined!");
}
const start = performance.now();
const app = new Aponia({
  plugins: [
    html({ autoDetect: false }) as unknown as AponiaPlugin,
    // staticPlugin({
    //  alwaysStatic: true,
    //  maxAge: 259200 /* 3 days */,
    //}) as unknown as AponiaPlugin,
    cookie() as unknown as AponiaPlugin,
    jwt({
      name: "jwt",
      secret: Bun.env.JWT_SECRET,
    }) as unknown as AponiaPlugin,
  ],
});

function getCurrentLocalIP() {
  const interfaces = networkInterfaces();
  const ips = Object.values(interfaces)?.flatMap((i) =>
    i?.map((a) => a?.address),
  );
  return ips?.filter((ip?: string) => ip?.startsWith("192.168"))[0] ?? "";
}

await app.start().then(
  (instance) => {
    const end = performance.now();
    const timeToStart = end - start;
    logger.info(
      `🐎 Aponia started successfully! (${timeToStart.toFixed(
        4,
      )}ms) \n\t\t\t 🖥️  Local: ${instance.server?.hostname}:${
        instance.server?.port
      } \n\t\t\t 🌐 Network: ${getCurrentLocalIP()}:${instance.server?.port}`,
    );
  },
  (reason) => console.error(`Couldn't boostrap Aponia!\nreason: ${reason}`),
);
