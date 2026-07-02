import { Controller, Get, Patch, Body, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { GetUser } from '../common/decorators/get-user.decorator';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  /**
   * GET /users/me — current user's profile.
   * `@GetUser('userId')` pulls `userId` off the JWT payload that
   * `JwtStrategy.validate` attached to `request.user`.
   */
  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getMe(@GetUser('userId') userId: string) {
    return this.usersService.findById(userId);
  }

  /**
   * PATCH /users/me — partial update of the current user.
   */
  @UseGuards(JwtAuthGuard)
  @Patch('me')
  async updateMe(
    @GetUser('userId') userId: string,
    @Body() dto: UpdateUserDto,
  ) {
    return this.usersService.update(userId, dto);
  }
}
