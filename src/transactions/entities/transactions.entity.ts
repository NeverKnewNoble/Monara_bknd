import { TransactionType } from '@prisma/client';

export class Transaction {
  id: string;
  amount: number;
  type: TransactionType;
  note?: string;
  date: Date;
  createdAt: Date;
  userId: string;
  accountId: string;
  categoryId?: string;
}