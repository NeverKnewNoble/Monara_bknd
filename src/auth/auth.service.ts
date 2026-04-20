/**
 * Auth service.
 *
 * Owns everything related to authentication:
 *  - hashing passwords (via bcrypt) so we never store plain text
 *  - verifying credentials on login
 *  - generating JWT tokens the client uses to prove who it is
 *
 * UsersService handles actual storage/lookup of users; this service
 * just layers auth behaviour on top of it.
 */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  /**
   * Register a new user.
   *
   * Steps:
   *   1. Hash the supplied password so the raw value is never stored.
   *   2. Create the user record via UsersService.
   *   3. Issue a JWT so the new user is logged in right away.
   *
   * @param data - registration fields (email, name, password).
   * @returns `{ access_token, user }` — same shape as login.
   */
  async register(data: any) {
    // bcrypt.hash(value, saltRounds). 10 is a reasonable default cost.
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await this.usersService.create({
      ...data,
      password: hashedPassword,
    });

    return this.generateToken(user);
  }

  /**
   * Log an existing user in.
   *
   * Throws `UnauthorizedException` on any failure (unknown email OR
   * wrong password). We intentionally use the same error message for
   * both cases so an attacker can't tell which emails are registered.
   *
   * @returns `{ access_token, user }` on success.
   */
  async login(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);

    if (!user) throw new UnauthorizedException('Invalid credentials');

    // `bcrypt.compare` hashes `password` with the same salt embedded in
    // `user.password` and checks for equality — safe against timing attacks.
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) throw new UnauthorizedException('Invalid credentials');

    return this.generateToken(user);
  }

  /**
   * Build the JWT payload, sign it, and bundle it with a safe subset of
   * the user object (we never return the password hash).
   *
   * The returned `access_token` should be sent by the client as
   * `Authorization: Bearer <token>` on every protected request.
   */
  generateToken(user: any) {
    // `sub` ("subject") is the standard JWT claim for the user id.
    const payload = { sub: user.id, email: user.email };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    };
  }
}
