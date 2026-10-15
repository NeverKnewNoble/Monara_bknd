import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get()
  async fetchAllCategories() {
    return this.categoriesService.fetchAllCategories();
  }

  @Post()
  async createCategory(@Body() dto: CreateCategoryDto) {
    return this.categoriesService.createCategory(dto);
  }

  @Patch(':id')
  async updateCategory(
    @Param('id') id: string,
    @Body() dto: CreateCategoryDto,
  ) {
    return this.categoriesService.updateCategory(id, dto);
  }

  @Delete(':id')
  async deleteCategory(@Param('id') id: string) {
    return this.categoriesService.deleteCategory(id);
  }
}
