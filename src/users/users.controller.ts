/**
 * Users controller.
 *
 * Exposes HTTP endpoints for the currently logged-in user to read and
 * update their own profile. Every route here is protected by
 * `JwtAuthGuard`, meaning the caller must send a valid JWT in the
 * `Authorization: Bearer <token>` header.
 *
 * Routes live under `/users`.
 */
import { Controller, Get, Patch, Body, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  // Nest injects `UsersService` so the controller can delegate real work.
  constructor(private usersService: UsersService) {}

  /**
   * GET /users/me
   *
   * Returns the profile of the currently logged-in user. The JWT guard
   * attaches the decoded token payload to `req.user`, which contains
   * `userId` (set by `JwtStrategy.validate`).
   */
  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getMe(@Req() req) {
    return this.usersService.findById(req.user.userId);
  }

  /**
   * PATCH /users/me
   *
   * Updates the logged-in user's profile. Only the fields provided in
   * the request body are changed (see `UpdateUserDto` — every field is
   * optional).
   */
  @UseGuards(JwtAuthGuard)
  @Patch('me')
  async updateMe(@Req() req, @Body() dto: UpdateUserDto) {
    return this.usersService.update(req.user.userId, dto);
  }
}
