import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { CreateBudgetDto } from './dto/create-budget.dto';

@Injectable()
export class budgetService {
  constructor(private prisma: PrismaService) {}

  async fetchBudget(id: string) {
    const budget = await this.prisma.budget.findUnique({ where: { id } });
    if (!budget) throw new NotFoundException('Budget not found');
    return budget;
  }

  async createBudget(data: CreateBudgetDto) {
    try {
      return await this.prisma.budget.create({
        data: {
          amount: data.amount,
          month: data.month,
          year: data.year,
          userId: data.userId,
          categoryId: data.categoryId,
        },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new Error('Budget already exists');
      }
      throw error;
    }
  }
}
