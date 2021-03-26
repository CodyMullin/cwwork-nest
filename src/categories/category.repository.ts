import { Category } from './category.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoryStatus } from './category-status.enum';
import { GetCategoryFilterDto } from './dto/get-category-filter.dto';
import { User } from '../auth/user.entity';

@EntityRepository(Category)
export class CategoryRepository extends Repository<Category> {
  async getCategories(
    filterDto: GetCategoryFilterDto,
    user: User,
  ): Promise<Category[]> {
    const { active, search } = filterDto;
    const query = this.createQueryBuilder('category');

    query.where('category.userId = :userId', { userId: user.id });

    if (active) {
      query.andWhere('category.active = :active', { active });
    }

    if (search) {
      query.andWhere('(LOWER(category.name) LIKE LOWER(:search))', {
        search: `%${search}%`,
      });
    }

    const categories = query.orderBy('category.name', 'ASC').getMany();
    return categories;
  }

  async createCategory(
    createCategoryDto: CreateCategoryDto,
    user: User,
  ): Promise<Category> {
    const { name } = createCategoryDto;

    const category = new Category();
    category.name = name;
    category.active = CategoryStatus.ACTIVE;
    category.user = user;

    await category.save();

    delete category.user;
    return category;
  }
}
