import { Injectable, NotFoundException } from "@nestjs/common"
import { PrismaService } from "../prisma/prisma.service"
import { Transaction } from "./entities/transactions.entity"
import { Prisma } from "@prisma/client";

@Injectable()
export class transactionsService {
    constructor(private prisma: PrismaService) {}

    /**
     * Get a transaction by id
     * @param id - The id of the transaction to get
     * @returns The transaction
     * @throws NotFoundException if the transaction is not found
     * @throws PrismaClientKnownRequestError if the transaction is not found
     */
    async getTransaction(id: string) {
        try {
            return this.prisma.transaction.findUnique({ where: { id } })
        } catch(error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
                throw new NotFoundException('Transaction not found');
            }
            throw error;
        }
    }

    /**
     * Create a new transaction
     * @param data - The data of the transaction to create
     * @returns The created transaction
     * @throws NotFoundException if the transaction is not found
     * @throws PrismaClientKnownRequestError if the transaction already exists
     * @throws PrismaClientRequestError if the transaction already exists
     */
    async createTransaction(data: Transaction) {
        try{
            const createData: Prisma.TransactionUncheckedCreateInput = {
                amount: data.amount,
                type: data.type,
                note: data.note,
                // If client sends null/empty date, default to "now" instead of failing validation.
                date: data.date ? new Date(data.date) : new Date(),
                userId: data.userId,
                accountId: data.accountId,
                categoryId: data.categoryId ?? null,
            };

            return this.prisma.transaction.create({ data: createData })
        } catch(error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
                    throw new Error('Transaction already exists');
                }
                throw error;
            }
        }
    }
