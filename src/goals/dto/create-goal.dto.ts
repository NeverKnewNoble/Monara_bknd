import {
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateGoalDto {
  @IsString()
  name: string;

  @IsNumber()
  targetAmount: number;

  @IsOptional()
  @IsNumber()
  currentAmount?: number;

  @IsOptional()
  @IsDateString()
  deadline?: string;

  @IsUUID()
  userId: string;
}
