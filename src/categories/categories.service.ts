import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { GetCategoryFilterDto } from './dto/get-category-filter.dto';
import { Category } from './category.entity';
import { CategoryRepository } from './category.repository';
import { User } from '../auth/user.entity';
import { CategoryStatus } from './category-status.enum';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoryRepository)
    private categoryRespository: CategoryRepository,
  ) {}

  async getCategories(
    filterDto: GetCategoryFilterDto,
    user: User,
  ): Promise<Category[]> {
    return this.categoryRespository.getCategories(filterDto, user);
  }

  async getCategoryById(id: number, user: User): Promise<Category> {
    const found = await this.categoryRespository.findOne({
      where: { id, userId: user.id },
    });

    if (!found) {
      throw new NotFoundException(`Category with ID "${id}" not found`);
    }

    return found;
  }

  async createCategory(
    createCategoryDto: CreateCategoryDto,
    user: User,
  ): Promise<Category> {
    return this.categoryRespository.createCategory(createCategoryDto, user);
  }

  async deleteCategory(id: number, user: User): Promise<void> {
    const result = await this.categoryRespository.delete({
      id,
      userId: user.id,
    });

    if (result.affected === 0) {
      throw new NotFoundException(`Category with ID "${id}" not found`);
    }
  }

  async updateCategory(
    id: number,
    name: string,
    active: CategoryStatus,
    user: User,
  ): Promise<Category> {
    const category = await this.getCategoryById(id, user);

    category.id = id;
    category.name = name;
    category.active = active;

    console.log(category);
    // await category.save();
    return category;
  }
}
