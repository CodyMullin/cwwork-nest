import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateEstimateDto } from './dto/create-estimate.dto';
import { GetEstimateFilterDto } from './dto/get-estimate-filter.dto';
import { Estimate } from './estimate.entity';
import { EstimateRepository } from './estimate.repository';
import { EstimateStatus } from './estimate-status.enum';
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

  async updateEstimate(
    id: number,
    customerName: string,
    status: EstimateStatus,
    user: User,
  ): Promise<Estimate> {
    const estimate = await this.getEstimateById(id, user);

    estimate.id = id;
    estimate.customerName = customerName;
    estimate.status = status;

    await estimate.save();
    return estimate;
  }
}
