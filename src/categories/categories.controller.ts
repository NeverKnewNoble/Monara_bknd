import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Category } from './entities/category.entity';

@Controller('categories')
export class CategoriesController {
    constructor(private categoriesService: CategoriesService) {}

    @Get(':id')
    async fetchCategory(@Param('id') id: string) {
        return this.categoriesService.fetchCategory(id);
    }

    @Post()
    async createCategory(@Body() data: Category) {
        return this.categoriesService.createCategory(data);
    }
}