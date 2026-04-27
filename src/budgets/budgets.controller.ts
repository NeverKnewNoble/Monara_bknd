import { BadRequestException, Body, Controller, Get, Param, Post } from "@nestjs/common";
import { budgetService } from "./budgets.service";
import { Budget } from "./entities/budget.entity";

@Controller('budgets')
export class budgetController {
    constructor(private budgetsService: budgetService) {}

    // Fetch a budget by id
    @Get(':id')
    async fetchBudget(@Param('id') id: string) {
        return this.budgetsService.fetchBudget(id);
    }

    // Create a new budget
    @Post()
    async createBudget(@Body() data: Budget) {
        try {
            return this.budgetsService.createBudget(data);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }
}