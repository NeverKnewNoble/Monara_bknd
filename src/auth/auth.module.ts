/**
 * Auth module.
 *
 * Wires together the pieces used for authentication:
 *   - `AuthController` — exposes /auth/register and /auth/login.
 *   - `AuthService`    — password hashing, login checks, token creation.
 *   - `JwtStrategy`    — validates incoming JWTs on protected routes.
 *
 * Depends on UsersModule so it can create/lookup users, and on the
 * Nest `JwtModule` which provides the `JwtService` used for signing.
 */
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    // Gives us access to UsersService (exported from UsersModule).
    UsersModule,

    // Configure JWT signing. In production the secret should come from
    // an environment variable, NEVER be hard-coded.
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'supersecret',
      signOptions: { expiresIn: '6h' }, // tokens are valid for 6 hours
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
