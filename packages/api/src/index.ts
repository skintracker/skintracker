import { Aponia } from 'aponia';

const start = performance.now();
const app = new Aponia();

await app.start().then(
  (instance) => {
    const end = performance.now();
    const timeToStart = end - start;
    console.log(`🐎 Aponia started: ${instance.server?.hostname}:${instance.server?.port} (${timeToStart}ms)`);
  },
  (reason) => console.error(`Couldn't boostrap Aponia!\nreason: ${reason}`),
);
