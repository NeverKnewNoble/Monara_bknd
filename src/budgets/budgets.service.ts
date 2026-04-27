import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Budget, Prisma } from '@prisma/client';

@Injectable()
export class budgetService {
    constructor(private prisma: PrismaService) {}

    /**
     * Fetch a budget by id
     * @param id - The id of the budget to fetch
     * @returns The budget
     * @throws NotFoundException if the budget is not found
     * @throws PrismaClientKnownRequestError if the budget is not found
     */
    async fetchBudget(id: string) {
        try{
            return this.prisma.budget.findUnique({ where: { id } });
        } catch(error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
                throw new NotFoundException('Budget not found');
            }   
            throw error;
        }  
    }

    
    /**
     * Create a new budget
     * @param data - The data of the budget to create
     * @returns The created budget
     * @throws NotFoundException if the budget is not found
     * @throws PrismaClientKnownRequestError if the budget already exists
     * @throws PrismaClientRequestError if the budget already exists
     */
    async createBudget(data: Budget) {
        try{
            return this.prisma.budget.create({
                data: {
                    amount: data.amount,
                    month: data.month,
                    year: data.year,
                    userId: (data as Budget & { userId: string }).userId,
                    categoryId: (data as Budget & { categoryId: string }).categoryId,
                },
            })

        } catch(error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
                throw new Error('Budget already exists');
            }       
            throw error;
        }
    }
}