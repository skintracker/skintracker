FROM oven/bun:latest

COPY package.json ./
COPY bun.lockb ./
COPY tsconfig.json ./
COPY packages ./

RUN bun install

CMD ["bun", "start"]
