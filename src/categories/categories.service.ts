import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { GetCategoryFilterDto } from './dto/get-category-filter.dto';
import { Category } from './category.entity';
import { CategoryRepository } from './category.repository';
import { User } from '../auth/user.entity';

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

  //   async updateMaterial(
  //     id: number,
  //     name: string,
  //     description: string,
  //     salesCost: string,
  //     purchaseCost: string,
  //     installCost: string,
  //     category: string,
  //     measurement: string,
  //     active: MaterialStatus,
  //     user: User,
  //   ): Promise<Material> {
  //     const material = await this.getMaterialById(id, user);

  //     material.id = id;
  //     material.name = name;
  //     material.description = description;
  //     material.salesCost = salesCost;
  //     material.purchaseCost = purchaseCost;
  //     material.installCost = installCost;
  //     material.category = category;
  //     material.measurement = measurement;
  //     material.active = active;

  //     await material.save();
  //     return material;
  //   }
}
