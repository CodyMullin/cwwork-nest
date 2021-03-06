import { Module } from '@nestjs/common';
import { RoomsController } from './rooms.controller';
import { RoomsService } from './rooms.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { RoomRepository } from './room.repository';

@Module({
  imports: [TypeOrmModule.forFeature([RoomRepository]), AuthModule],
  controllers: [RoomsController],
  providers: [RoomsService],
})
export class RoomsModule {}
