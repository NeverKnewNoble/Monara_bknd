/**
 * `@GetUser()` param decorator.
 *
 * Pulls the authenticated user (attached to `request.user` by
 * `JwtStrategy.validate`) out of the request in one shot, so controllers
 * don't have to deal with raw `@Req() req` and `req.user.userId`.
 *
 * Usage:
 *   @Get('me')
 *   getMe(@GetUser() user: AuthUser)          // full payload
 *   getMe(@GetUser('userId') id: string)      // a single field
 */
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export interface AuthUser {
  userId: string;
  email: string;
}

export const GetUser = createParamDecorator(
  (data: keyof AuthUser | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user: AuthUser | undefined = request.user;
    return data ? user?.[data] : user;
  },
);
