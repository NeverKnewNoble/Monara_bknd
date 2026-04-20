/**
 * Users module.
 *
 * Bundles everything related to users (controller + service) into a
 * single unit that the rest of the app can import. `UsersService` is
 * exported so that other modules (like AuthModule) can use it to look
 * up / create users.
 */
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  providers: [UsersService],
  controllers: [UsersController],
  // Exporting makes UsersService available to any module that imports
  // UsersModule — AuthModule depends on this.
  exports: [UsersService],
})
export class UsersModule {}
