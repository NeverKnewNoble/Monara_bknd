# Monara Backend

Personal-finance API built with [NestJS](https://nestjs.com/), [Prisma](https://www.prisma.io/), and PostgreSQL. It exposes JWT-authenticated endpoints for managing users, accounts, transactions, categories, budgets, and goals.

## Tech stack

- **NestJS 11** — application framework
- **Prisma 7** (`@prisma/adapter-pg`) — ORM / migrations against PostgreSQL
- **Passport + JWT** — authentication
- **class-validator / class-transformer** — request validation (global `ValidationPipe` with `whitelist` + `forbidNonWhitelisted`)

## Prerequisites

- Node.js (LTS)
- Yarn
- A PostgreSQL database

## Project setup

```bash
$ yarn install
```

## Environment variables

Configuration is loaded with `dotenv` (`import 'dotenv/config'` in `src/main.ts` and `prisma.config.ts`).

> **Important:** dotenv reads a file named **`.env`** by default — it does **not** read `.env.local`. Put your values in `.env` at the project root. Both `.env` and `.env.local` are gitignored, so `.env` is safe from commits.

Create a `.env` file:

```dotenv
# PostgreSQL connection string — REQUIRED
# Format: postgresql://USER:PASSWORD@HOST:PORT/DATABASE
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/monara"

# Secret used to sign/verify JWTs — REQUIRED (set a strong random value)
# If unset, the code falls back to an insecure default ("supersecret").
JWT_SECRET="change-me-to-a-long-random-string"

# Port the API listens on — optional (default: 8001)
PORT=8001

# Allowed CORS origins, comma-separated — optional (default: http://localhost:3000)
CORS_ORIGIN="http://localhost:3000"
```

| Variable | Required | Used by | Default |
|---|---|---|---|
| `DATABASE_URL` | **Yes** | `src/prisma/prisma.service.ts`, `prisma.config.ts` | — (DB connection fails without it) |
| `JWT_SECRET` | **Yes** | `src/auth/auth.module.ts`, `src/auth/strategies/jwt.strategy.ts` | `supersecret` (insecure — set your own) |
| `PORT` | No | `src/main.ts` | `8001` |
| `CORS_ORIGIN` | No | `src/main.ts` | `http://localhost:3000` |

## Database

After setting `DATABASE_URL`, generate the Prisma client and apply migrations:

```bash
# generate the Prisma client
$ npx prisma generate

# create / apply migrations against your database
$ npx prisma migrate dev

# (optional) open Prisma Studio to inspect data
$ npx prisma studio
```

## Compile and run the project

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run build
$ yarn run start:prod
```

The API listens on `http://localhost:8001` by default.

## Run tests

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Project structure

```
src/
├── auth/          # registration, login, JWT strategy & guard
├── users/         # user CRUD
├── accounts/      # financial accounts (PERSONAL / BUSINESS)
├── transactions/  # income / expense transactions
├── categories/    # transaction categories
├── budgets/       # per-category monthly budgets
├── goals/         # savings goals
├── prisma/        # PrismaService (pg adapter) + module
├── common/        # shared decorators (e.g. @GetUser)
└── main.ts        # bootstrap, CORS, global ValidationPipe
prisma/
├── schema.prisma  # data model
└── migrations/    # migration history
```

## License

This project is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
