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

  //   @Patch('/:id/update')
  //   updateMaterial(
  //     @Param('id', ParseIntPipe) id: number,
  //     @Body('name') name: string,
  //     @Body('description') description: string,
  //     @Body('salesCost') salesCost: string,
  //     @Body('purchaseCost') purchaseCost: string,
  //     @Body('installCost') installCost: string,
  //     @Body('category') category: string,
  //     @Body('measurement') measurement: string,
  //     @Body('active', MaterialActiveValidationPipe) active: MaterialStatus,
  //     @GetUser() user: User,
  //   ): Promise<Material> {
  //     return this.materialsService.updateMaterial(
  //       id,
  //       name,
  //       description,
  //       salesCost,
  //       purchaseCost,
  //       installCost,
  //       category,
  //       measurement,
  //       active,
  //       user,
  //     );
  //   }
}
