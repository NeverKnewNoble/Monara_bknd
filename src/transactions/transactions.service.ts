import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Injectable()
export class transactionsService {
  constructor(private prisma: PrismaService) {}

  async getTransaction(id: string) {
    const tx = await this.prisma.transaction.findUnique({ where: { id } });
    if (!tx) throw new NotFoundException('Transaction not found');
    return tx;
  }

  async createTransaction(data: CreateTransactionDto) {
    try {
      return await this.prisma.transaction.create({
        data: {
          amount: data.amount,
          type: data.type,
          note: data.note,
          // If client sends no date, default to "now" instead of failing validation.
          date: data.date ? new Date(data.date) : new Date(),
          userId: data.userId,
          accountId: data.accountId,
          categoryId: data.categoryId ?? null,
        },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new Error('Transaction already exists');
      }
      throw error;
    }
  }
}
