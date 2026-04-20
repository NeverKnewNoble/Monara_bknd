/**
 * Register DTO.
 *
 * Shape expected by `POST /auth/register`. Mirrors `CreateUserDto`
 * but lives in the auth folder because registration is an auth concern.
 */
import { IsEmail, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  // Must be a valid email address.
  @IsEmail()
  email: string;

  // Display name.
  @IsString()
  name: string;

  // Must be at least 6 characters. Hashed by AuthService before storage.
  @MinLength(6)
  password: string;
}
