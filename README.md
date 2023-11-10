# skintracker

## Prerequisites

1. [Bun v1.0.11+](https://bun.sh/)

## Getting Started

1. Link the `@skintracker/types` package:

```bash
cd ./packages/types
bun link
```

2. Install deps:

```bash
cd ../..
bun i
```

3. Configure .env files in both root of the project and in the root of the API package:

```
touch .env
vim|nano|code .env
cp ./.env ./packages/api/.env
```

Values can be obtained from Google Cloud Secret Manager.

4. ... and that should be it!

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
