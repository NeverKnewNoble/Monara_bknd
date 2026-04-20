/**
 * JWT Passport strategy.
 *
 * Tells Passport how to read and verify JWTs from an incoming request.
 * `JwtAuthGuard` wraps this strategy and runs it on every protected route.
 *
 * Flow on a protected request:
 *   1. Extract the token from the `Authorization: Bearer <token>` header.
 *   2. Verify the signature against our `JWT_SECRET`.
 *   3. If valid, call `validate()` below with the decoded payload.
 *   4. Whatever `validate()` returns is attached to `request.user`.
 */
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      // Pull the JWT out of the "Authorization: Bearer ..." header.
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),

      // Same secret used by AuthModule to sign tokens — they MUST match.
      secretOrKey: process.env.JWT_SECRET || 'supersecret',
    });
  }

  /**
   * Runs after the token signature has been verified.
   *
   * `payload` is whatever we put inside the JWT in `AuthService.generateToken`
   * (i.e. `{ sub: user.id, email: user.email }`). The returned object
   * becomes `request.user` in controllers.
   */
  async validate(payload: any) {
    return {
      userId: payload.sub,
      email: payload.email,
    };
  }
}
