import { Injectable, NotFoundException } from '@nestjs/common';
import { Account } from './entities/account.entity'
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class AccountsService {
    constructor(private prisma: PrismaService) {}

    /**
     * Fetch an account by id
     * @param id - The id of the account to fetch
     * @returns The account
     * @throws NotFoundException if the account is not found
     * @throws PrismaClientKnownRequestError if the account is not found
     */
    async fetchAccount(id: string) {
        try {
            const account = await this.prisma.account.findUnique({ where: { id } });
            if (!account) {
                throw new NotFoundException('Account not found');
            }
            return account;
        } catch(error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
                throw new NotFoundException('Account not found');
            }
            throw error;
        }
    }

    /**
     * Create a new account
     * @param data - The data of the account to create
     * @returns The created account
     * @throws NotFoundException if the account is not found
     * @throws PrismaClientKnownRequestError if the account already exists
     * @throws PrismaClientRequestError if the account already exists
     */
    async createAccount(data: Account) {
        try {
            // Save a new account using Prisma; fields like `id` and `createdAt`
            // are generated from defaults defined in `schema.prisma`.
            return this.prisma.account.create({
                data: {
                    name: data.name,
                    type: data.type,
                    balance: data.balance,
                    userId: (data as Account & { userId: string }).userId,
                },
            });
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
                throw new Error('Account already exists');
            }
            throw error;
        }
    }
}