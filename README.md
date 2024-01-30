# skintracker

## Prerequisites

1. [Bun v1.0.25+](https://bun.sh/)

If Bun is already installed, you can run `bun upgrade` to update to the latest version of Bun.

## Getting Started

1. Install deps:

```bash
cd ../..
bun i
```

2. Configure .env files in both root of the project and in the root of the API package:

```
touch .env
vim|nano|code .env
cp ./.env ./packages/api/.env
```

Values can be obtained from Google Cloud Secret Manager.

3. ... and that should be it!

## Running Locally

To run the project in development mode, run the following in your terminal:

```bash
bun dev
```

Alternatively, you can run the project in production by running:

```bash
bun start
```

This will transpile TS to JS and start the transpiled application. However, you will need to have created a symbolic link in the root directory to public assets:

```bash
# IN ROOT DIRECTORY!
ln -s ./packages/api/public ./public
```

## Running via Docker

Docker is an alternative way of running the application, which is necessary on Linux distributions. To run the application in dev mode using Docker:
```bash
bun build:dev-docker
bun dev:docker
```

Similarly, the production build can be run using the following:

```bash
bun build:docker
bun start:docker
```

