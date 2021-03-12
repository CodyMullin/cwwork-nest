import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateEstimateDto } from './dto/create-estimate.dto';
import { GetEstimateFilterDto } from './dto/get-estimate-filter.dto';
import { Estimate } from './estimate.entity';
import { EstimateRepository } from './estimate.repository';
// import { EstimateStatus } from './estimate.repository';
import { User } from '../auth/user.entity';

@Injectable()
export class EstimatesService {
  constructor(
    @InjectRepository(EstimateRepository)
    private estimateRespository: EstimateRepository,
  ) {}

  async getEstimates(
    filterDto: GetEstimateFilterDto,
    user: User,
  ): Promise<Estimate[]> {
    return this.estimateRespository.getEstimates(filterDto, user);
  }

  async getEstimateById(id: number, user: User): Promise<Estimate> {
    const found = await this.estimateRespository.findOne({
      where: { id, userId: user.id },
    });

    if (!found) {
      throw new NotFoundException(`Estimate with ID "${id}" not found`);
    }

    return found;
  }

  async createEstimate(
    createEstimateDto: CreateEstimateDto,
    user: User,
  ): Promise<Estimate> {
    return this.estimateRespository.createEstimate(createEstimateDto, user);
  }

  async deleteEstimate(id: number, user: User): Promise<void> {
    const result = await this.estimateRespository.delete({
      id,
      userId: user.id,
    });

    if (result.affected === 0) {
      throw new NotFoundException(`Estimate with ID "${id}" not found`);
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
