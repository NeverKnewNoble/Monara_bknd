import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { CreateGoalDto } from './dto/create-goal.dto';

@Injectable()
export class goalsService {
  constructor(private prisma: PrismaService) {}

  async fetchGoal(id: string) {
    const goal = await this.prisma.goal.findUnique({ where: { id } });
    if (!goal) throw new NotFoundException('Goal not found');
    return goal;
  }

  async createGoal(data: CreateGoalDto) {
    try {
      return await this.prisma.goal.create({
        data: {
          name: data.name,
          targetAmount: data.targetAmount,
          currentAmount: data.currentAmount ?? 0,
          deadline: data.deadline ? new Date(data.deadline) : null,
          userId: data.userId,
        },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new Error('Goal already exists');
      }
      throw error;
    }
  }
}
