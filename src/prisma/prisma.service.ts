/**
 * Prisma service.
 *
 * Thin wrapper around Prisma's `PrismaClient` so it becomes a Nest-injectable
 * provider. `PrismaModule` marks this service `@Global()`, meaning any
 * service in the app can inject it without re-importing PrismaModule.
 *
 * Prisma 7 no longer ships built-in database drivers. Instead you pass a
 * "driver adapter" that wraps a real DB driver. We use `PrismaPg` (which
 * wraps the `pg` package) because this app talks to PostgreSQL.
 */
import {
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    super({
      // The adapter holds the actual Postgres connection. Prisma routes
      // every query through it. `DATABASE_URL` is auto-loaded from `.env`.
      adapter: new PrismaPg({
        connectionString: process.env.DATABASE_URL,
      }),
    });
  }

  /** Open the DB connection when Nest starts the module. */
  async onModuleInit() {
    await this.$connect();
  }

  /** Cleanly close the DB connection when Nest shuts down. */
  async onModuleDestroy() {
    await this.$disconnect();
  }
}
