import { AccountType } from '@prisma/client';
import { IsEnum, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateAccountDto {
  @IsString()
  name: string;

  @IsEnum(AccountType)
  type: AccountType;

  @IsOptional()
  @IsNumber()
  balance?: number;

  @IsUUID()
  userId: string;
}
