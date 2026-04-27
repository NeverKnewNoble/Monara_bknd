import { TransactionType } from "@prisma/client";

export class Category {
    id: string;
    name: string;
    type: TransactionType;
    userId?: string;
    createdAt: Date;
    updatedAt: Date;
}