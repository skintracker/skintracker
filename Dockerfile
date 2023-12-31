FROM oven/bun:latest
WORKDIR /usr/src/app

COPY . .
RUN bun install

RUN ln -s ./packages/api/public ./public

EXPOSE 3001/tcp
ENTRYPOINT ["bun", "start"]
