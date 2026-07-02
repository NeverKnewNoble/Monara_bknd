import { TransactionType } from '@prisma/client';
import { IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  name: string;

  @IsEnum(TransactionType)
  type: TransactionType;

  // Optional: omit for a global/system category.
  @IsOptional()
  @IsUUID()
  userId?: string;
}
