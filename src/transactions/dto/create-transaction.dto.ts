import { TransactionType } from '@prisma/client';
import {
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateTransactionDto {
  @IsNumber()
  amount: number;

  @IsEnum(TransactionType)
  type: TransactionType;

  @IsOptional()
  @IsString()
  note?: string;

  // Accept any ISO-8601 string; service converts to Date.
  @IsOptional()
  @IsDateString()
  date?: string;

  @IsUUID()
  userId: string;

  @IsUUID()
  accountId: string;

  @IsOptional()
  @IsUUID()
  categoryId?: string;
}
