import { Module } from '@nestjs/common';
import { goalsController } from './goals.controller';
import { goalsService } from './goals.service';

@Module({
  controllers: [goalsController],
  providers: [goalsService],
})
export class GoalsModule {}
