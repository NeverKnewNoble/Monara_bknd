/**
 * JWT auth guard.
 *
 * A "guard" in NestJS decides whether a request is allowed to hit a
 * route. This guard uses Passport's `jwt` strategy (see
 * `strategies/jwt.strategy.ts`) to:
 *   1. Read the `Authorization: Bearer <token>` header.
 *   2. Verify the token's signature and expiry.
 *   3. Attach the decoded payload to `request.user`.
 *
 * Use it on any route that requires a logged-in user:
 *
 *   @UseGuards(JwtAuthGuard)
 *   @Get('me')
 *   getMe(@Req() req) { ... }
 */
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
