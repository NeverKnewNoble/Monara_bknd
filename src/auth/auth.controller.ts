/**
 * Auth controller.
 *
 * Public endpoints for signing up and logging in. Neither route is
 * protected — you don't need a token to hit them (that's the whole point;
 * you're trying to *get* a token). Both delegate the actual work to
 * `AuthService`.
 *
 * Routes live under `/auth`.
 */
import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  /**
   * POST /auth/register
   *
   * Creates a new user and returns a JWT so the caller is
   * immediately "logged in" after signup.
   */
  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  /**
   * POST /auth/login
   *
   * Checks email + password. On success returns a JWT that the client
   * should send back on every authenticated request.
   */
  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto.email, dto.password);
  }
}
