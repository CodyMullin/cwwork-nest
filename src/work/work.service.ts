import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WorkRepository } from './work.repository';
import { Work } from './work.entity';
import { User } from '../auth/user.entity';
import { CreateWorkDto } from './dto/create-work.dto';

@Injectable()
export class WorkService {
  constructor(
    @InjectRepository(WorkRepository)
    private workRepository: WorkRepository,
  ) {}

  async getWorks(user: User): Promise<Work[]> {
    return this.workRepository.getWorks(user);
  }

  async getWorkById(id: number, user: User): Promise<Work> {
    const found = await this.workRepository.findOne({
      where: { id, userId: user.id },
    });

    if (!found) {
      throw new NotFoundException(`Work with ID "${id}" not found`);
    }

    return found;
  }

  async createWork(createWorkDto: CreateWorkDto, user: User): Promise<Work> {
    return this.workRepository.createWork(createWorkDto, user);
  }

  async deleteWork(id: number, user: User): Promise<void> {
    const result = await this.workRepository.delete({
      id,
      userId: user.id,
    });

    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
  }
}
