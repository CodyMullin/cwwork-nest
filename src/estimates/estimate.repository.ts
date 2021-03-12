import { Estimate } from './estimate.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateEstimateDto } from './dto/create-estimate.dto';
import { EstimateStatus } from './estimate-status.enum';
import { GetEstimateFilterDto } from './dto/get-estimate-filter.dto';
import { User } from '../auth/user.entity';

@EntityRepository(Estimate)
export class EstimateRepository extends Repository<Estimate> {
  async getEstimates(
    filterDto: GetEstimateFilterDto,
    user: User,
  ): Promise<Estimate[]> {
    const { active, search } = filterDto;
    const query = this.createQueryBuilder('estimate');

    query.where('estimate.userId = :userId', { userId: user.id });

    if (active) {
      query.andWhere('estimate.active = :active', { active });
    }

    if (search) {
      query.andWhere('(LOWER(estimate.id) LIKE LOWER(:search))', {
        search: `%${search}%`,
      });
    }

    const estimates = query.getMany();
    return estimates;
  }

  async createEstimate(
    createEstimateDto: CreateEstimateDto,
    user: User,
  ): Promise<Estimate> {
    const { customerName } = createEstimateDto;

    const estimate = new Estimate();
    estimate.customerName = customerName;
    estimate.status = EstimateStatus.PENDING;
    estimate.user = user;

    await estimate.save();

    delete estimate.user;
    return estimate;
  }
}
