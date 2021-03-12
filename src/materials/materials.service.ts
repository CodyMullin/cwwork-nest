import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMaterialDto } from './dto/create-material.dto';
import { GetMaterialFilterDto } from './dto/get-material-filter.dto';
import { Material } from './material.entity';
import { MaterialRepository } from './material.repository';
import { MaterialStatus } from './material-status.enum';
import { User } from '../auth/user.entity';

@Injectable()
export class MaterialsService {
  constructor(
    @InjectRepository(MaterialRepository)
    private materialRespository: MaterialRepository,
  ) {}

  async getMaterials(
    filterDto: GetMaterialFilterDto,
    user: User,
  ): Promise<Material[]> {
    return this.materialRespository.getMaterials(filterDto, user);
  }

  async getMaterialById(id: number, user: User): Promise<Material> {
    const found = await this.materialRespository.findOne({
      where: { id, userId: user.id },
    });

    if (!found) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    return found;
  }

  async createMaterial(
    createMaterialDto: CreateMaterialDto,
    user: User,
  ): Promise<Material> {
    return this.materialRespository.createMaterial(createMaterialDto, user);
  }

  async deleteMaterial(id: number, user: User): Promise<void> {
    const result = await this.materialRespository.delete({
      id,
      userId: user.id,
    });

    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
  }

  async updateMaterial(
    id: number,
    name: string,
    description: string,
    salesCost: string,
    purchaseCost: string,
    installCost: string,
    category: string,
    measurement: string,
    active: MaterialStatus,
    user: User,
  ): Promise<Material> {
    const material = await this.getMaterialById(id, user);

    material.id = id;
    material.name = name;
    material.description = description;
    material.salesCost = salesCost;
    material.purchaseCost = purchaseCost;
    material.installCost = installCost;
    material.category = category;
    material.measurement = measurement;
    material.active = active;

    await material.save();
    return material;
  }
}
