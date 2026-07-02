import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { goalsService } from './goals.service';
import { CreateGoalDto } from './dto/create-goal.dto';

@Controller('goals')
export class goalsController {
  constructor(private goalsService: goalsService) {}

  @Get(':id')
  async fetchGoal(@Param('id') id: string) {
    return this.goalsService.fetchGoal(id);
  }

  @Post()
  async createGoal(@Body() dto: CreateGoalDto) {
    return this.goalsService.createGoal(dto);
  }
}
