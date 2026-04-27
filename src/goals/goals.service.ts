import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Goal } from './entities/goal.entity';
import { Prisma } from '@prisma/client';

@Injectable()
export class goalsService {
    constructor(private prisma: PrismaService) {}

    /***
     * Fetch a goal by id
     * 
     * @param id - The id of the goal to fetch
     * @returns The goal
     * @throws NotFoundException if the goal is not found
     * @throws PrismaClientKnownRequestError if the goal is not found
     */
    async fetchGoal(id: string) {
        try{
            return this.prisma.goal.findUnique({ where: { id } });
        } catch(error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
                throw new NotFoundException('Goal not found');
            }
            throw error;
        }
    }

    /**
     * Create a new goal
     * @param data - The data of the goal to create
     * @returns The created goal
     * @throws NotFoundException if the goal is not found
     * @throws PrismaClientKnownRequestError if the goal already exists
     * @throws PrismaClientRequestError if the goal already exists
     */
    async createGoal(data: Goal) {
        try{
            return this.prisma.goal.create({ data: {
                name: data.name,
                targetAmount: data.targetAmount,
                currentAmount: data.currentAmount,
                deadline: data.deadline,
                userId: (data as Goal & { userId: string }).userId,
            } });
        } catch(error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
                throw new Error('Goal already exists');
            }       
            throw error;
        }
    }  
}
