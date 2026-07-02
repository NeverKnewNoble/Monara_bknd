import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { budgetService } from './budgets.service';
import { CreateBudgetDto } from './dto/create-budget.dto';

@Controller('budgets')
export class budgetController {
  constructor(private budgetsService: budgetService) {}

  @Get(':id')
  async fetchBudget(@Param('id') id: string) {
    return this.budgetsService.fetchBudget(id);
  }

  @Post()
  async createBudget(@Body() dto: CreateBudgetDto) {
    return this.budgetsService.createBudget(dto);
  }
}
