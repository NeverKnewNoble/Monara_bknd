import { IsInt, IsNumber, IsUUID, Max, Min } from 'class-validator';

export class CreateBudgetDto {
  @IsNumber()
  amount: number;

  // 1 = January, 12 = December.
  @IsInt()
  @Min(1)
  @Max(12)
  month: number;

  @IsInt()
  year: number;

  @IsUUID()
  userId: string;

  @IsUUID()
  categoryId: string;
}
