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
import { MaterialsService } from './materials.service';
import { CreateMaterialDto } from './dto/create-material.dto';
import { GetMaterialFilterDto } from './dto/get-material-filter.dto';
import { MaterialActiveValidationPipe } from './pipes/material-active-validation.pipe';
import { Material } from './material.entity';
import { MaterialStatus } from './material-status.enum';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../auth/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';

@Controller('materials')
@UseGuards(AuthGuard())
export class MaterialsController {
  constructor(private materialsService: MaterialsService) {}

  @Get()
  getMaterials(
    @Query(ValidationPipe) filterDto: GetMaterialFilterDto,
    @GetUser() user: User,
  ): Promise<Material[]> {
    return this.materialsService.getMaterials(filterDto, user);
  }

  @Get('/:id')
  getMaterialById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<Material> {
    return this.materialsService.getMaterialById(id, user);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createMaterial(
    @Body() createMaterialDto: CreateMaterialDto,
    @GetUser() user: User,
  ): Promise<Material> {
    return this.materialsService.createMaterial(createMaterialDto, user);
  }

  @Delete('/:id')
  deleteMaterial(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<void> {
    return this.materialsService.deleteMaterial(id, user);
  }

  @Patch('/:id/update')
  updateMaterial(
    @Param('id', ParseIntPipe) id: number,
    @Body('name') name: string,
    @Body('description') description: string,
    @Body('salesCost') salesCost: string,
    @Body('purchaseCost') purchaseCost: string,
    @Body('installCost') installCost: string,
    @Body('category') category: string,
    @Body('measurement') measurement: string,
    @Body('active', MaterialActiveValidationPipe) active: MaterialStatus,
    @GetUser() user: User,
  ): Promise<Material> {
    return this.materialsService.updateMaterial(
      id,
      name,
      description,
      salesCost,
      purchaseCost,
      installCost,
      category,
      measurement,
      active,
      user,
    );
  }
}
