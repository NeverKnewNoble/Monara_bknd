import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Category } from './entities/category.entity';
import { Prisma } from '@prisma/client';

@Injectable()
export class CategoriesService {
    constructor(private prisma: PrismaService) {}

    async fetchCategory(id: string) {
        try {
            return this.prisma.category.findUnique({ where: { id } });
        } catch(error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
                throw new NotFoundException('Category not found');
            }
            throw error
        }
    }

    async createCategory(data: Category) {
        try{
            return this.prisma.category.create({
                data: {
                    id: data.id,
                    name: data.name,
                    type: data.type,
                    userId: (data as Category & { userId: string }).userId,
                }
            });
        }catch(error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
                throw new Error('Category already exists');
            }
            throw error;
        }
    }
}