/**
 * Update-user DTO.
 *
 * Shape expected by `PATCH /users/me`. Every field is optional — the
 * caller only has to send the ones they actually want to change.
 */
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateUserDto {
  // Optional new email. If present it must still be a valid email.
  @IsOptional()
  @IsEmail()
  email?: string;

  // Optional new display name.
  @IsOptional()
  @IsString()
  name?: string;

  // Optional new password (minimum 6 characters).
  @IsOptional()
  @MinLength(6)
  password?: string;
}
