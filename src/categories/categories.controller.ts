import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { GetCategoryFilterDto } from './dto/get-category-filter.dto';
import { Category } from './category.entity';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../auth/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';
import { CategoryStatus } from './category-status.enum';
import { CategoryActiveValidationPipe } from './pipes/category-active-validation.pipe';

@Controller('category')
@UseGuards(AuthGuard())
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get()
  getCategories(
    @Query(ValidationPipe) filterDto: GetCategoryFilterDto,
    @GetUser() user: User,
  ): Promise<Category[]> {
    return this.categoriesService.getCategories(filterDto, user);
  }

  @Get('/:id')
  getCategoryById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<Category> {
    return this.categoriesService.getCategoryById(id, user);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createCategory(
    @Body() createCategoryDto: CreateCategoryDto,
    @GetUser() user: User,
  ): Promise<Category> {
    return this.categoriesService.createCategory(createCategoryDto, user);
  }

  @Delete('/:id')
  deleteCategory(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<void> {
    return this.categoriesService.deleteCategory(id, user);
  }

  @Patch('/:id/update')
  updateMaterial(
    @Param('id', ParseIntPipe) id: number,
    @Body('name') name: string,
    @Body('active', CategoryActiveValidationPipe) active: CategoryStatus,
    @GetUser() user: User,
  ): Promise<Category> {
    return this.categoriesService.updateCategory(id, name, active, user);
  }
}
