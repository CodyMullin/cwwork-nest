import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRoomDto } from './dto/create-room.dto';
import { GetRoomFilterDto } from './dto/get-room-filter.dto';
import { Room } from './room.entity';
import { RoomRepository } from './room.repository';
import { User } from '../auth/user.entity';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(RoomRepository)
    private roomRespository: RoomRepository,
  ) {}

  async getRooms(filterDto: GetRoomFilterDto, user: User): Promise<Room[]> {
    return this.roomRespository.getRooms(filterDto, user);
  }

  async getRoomById(id: number, user: User): Promise<Room> {
    const found = await this.roomRespository.findOne({
      where: { id, userId: user.id },
    });

    if (!found) {
      throw new NotFoundException(`Room with ID "${id}" not found`);
    }

    return found;
  }

  async createRoom(createRoomDto: CreateRoomDto, user: User): Promise<Room> {
    return this.roomRespository.createRoom(createRoomDto, user);
  }

  async deleteRoom(id: number, user: User): Promise<void> {
    const result = await this.roomRespository.delete({
      id,
      userId: user.id,
    });

    if (result.affected === 0) {
      throw new NotFoundException(`Room with ID "${id}" not found`);
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
