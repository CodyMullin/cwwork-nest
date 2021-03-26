import { Module } from '@nestjs/common';
import { WorkController } from './work.controller';
import { WorkService } from './work.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkRepository } from './work.repository';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([WorkRepository]), AuthModule],
  controllers: [WorkController],
  providers: [WorkService],
})
export class WorkModule {}
