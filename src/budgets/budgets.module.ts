import { Module } from '@nestjs/common';
import { budgetController } from './budgets.controller';
import { budgetService } from './budgets.service';

@Module({
  controllers: [budgetController],
  providers: [budgetService],
})
export class BudgetsModule {}
