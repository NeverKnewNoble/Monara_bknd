import { BadRequestException, Body, Controller, Get, Param, Post } from "@nestjs/common";
import { goalsService } from "./goals.service";
import { Goal } from "./entities/goal.entity";

@Controller('goals')
export class goalsController {
    constructor(private goalsService: goalsService) {}

    // Fetch a goal by id
    @Get(':id')
    async fetchGoal(@Param('id') id: string) {
        return this.goalsService.fetchGoal(id);
    }

    // Create a new goal
    @Post()
    async createGoal(@Body() data: Goal) {
        try {
            return this.goalsService.createGoal(data);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }
}