/**
 * Create-user DTO.
 *
 * A "DTO" (Data Transfer Object) describes the exact shape the API
 * expects in a request body. The decorators from `class-validator`
 * run automatically (once a `ValidationPipe` is enabled) and reject
 * requests with missing or malformed fields before they reach the
 * controller.
 */
import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  // Must be a valid email address (e.g. "a@b.com").
  @IsEmail()
  email: string;

  // Must be a string — used as the display name.
  @IsString()
  name: string;

  // Must be at least 6 characters long.
  @MinLength(6)
  password: string;
}
