# @skintracker/api

## Local Development

Below are the steps to get the API up and running locally.

### Prerequisites

1. [Turso CLI](https://docs.turso.tech/)
2. [Docker](https://www.docker.com/)

### Setup

0. Ensure dependencies were installed during root repo setup.
1. Setup your local instance of libsql/server by running the following:

```bash
bun start:db
bun seed:db
```

Ensure you have access to the db by running `bun test:db-access`. This should print out the tables in the database.

2. Start the API for local development by running `bun dev`. This will start a hot-reloading server on port 3000. However,
Aponia's hot-reload doesn't exactly detect changes to the filesystem so you'll have to restart everytime a change is made (at least for now).

3. And that's it! This should connect your API to your local DB instance. For connecting a local instance to production, read the section below.

### Connecting to Production

It's possible to connect your local API to Turso production. This is useful for database migrations and other tasks that require a connection to the production database.

1. Ensure you have the [Turso CLI](https://docs.turso.tech/) installed. This can be checked using `turso --version`.
2. Login to Turso using `turso login`.
3. Ensure skintracker organization is the active organization by running `turso org switch skintracker`. If you have not been added to the Turso org, please request access.
4. Create a .env file in the root of the api package. This file should contain the following:

```bash
APONIA_ORIGIN=https://skintracker.io
APONIA_PORT=3001
ST_BITSKINS_API_KEY=test
ST_DMARKET_API_PUBLIC_KEY=test
ST_DMARKET_API_SECRET_KEY=test
ST_SKINPORT_API_SECRET=test
TURSO_DB=skintracker
TURSO_URL=libsql://example.turso.io # Obtain this from the Turso dashboard
TURSO_TOKEN=example # Obtain this from the Turso CLI by running `turso db tokens create skintracker`
```

Bun will automatically parse any environment variables stored in `.env`, `.env.prod`, or whatever postfix is applied to a .env file. To learn more about this parsing, see the [Bun env documentation](https://bun.sh/docs/runtime/env).

## Deploying

The entirety of the application is packaged due to the nature of the monorepo, so there's no additional steps for deployment. Simply build the root Docker container and deploy it to your server.

## Documentation

1. [Aponia](https://github.com/jacksonsalopek/aponia)
2. [Bun](https://bun.sh/docs)
3. [Turso](https://docs.turso.tech/)
4. [Sentry for Bun](https://docs.sentry.io/platforms/javascript/guides/bun/)
5. [Docker](https://www.docker.com/)
