import { EntityRepository, Repository } from 'typeorm';
import { User } from '../auth/user.entity';
import { CreateWorkDto } from './dto/create-work.dto';
import { Work } from './work.entity';

@EntityRepository(Work)
export class WorkRepository extends Repository<Work> {
  async getWorks(user: User): Promise<Work[]> {
    const query = this.createQueryBuilder('work');
    query.where('work.userId = :userId', { userId: user.id });

    const works = query.getMany();
    return works;
  }

  async createWork(createWorkDto: CreateWorkDto, user: User): Promise<Work> {
    const { material, area, workCost } = createWorkDto;

    const work = new Work();
    work.material = material;
    work.area = area;
    work.workCost = workCost;
    work.user = user;

    await work.save();

    delete work.user;
    return work;
  }
}
