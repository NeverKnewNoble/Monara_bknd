/**
 * Login DTO.
 *
 * Shape expected by `POST /auth/login`. Only `email` and `password`
 * are required. (We deliberately don't enforce `MinLength` on the
 * password here — login should accept whatever the user has already
 * registered with, even if our current rules have changed.)
 */
import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
