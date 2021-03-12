import { Room } from './room.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateRoomDto } from './dto/create-room.dto';
import { GetRoomFilterDto } from './dto/get-room-filter.dto';
import { User } from '../auth/user.entity';

@EntityRepository(Room)
export class RoomRepository extends Repository<Room> {
  async getRooms(filterDto: GetRoomFilterDto, user: User): Promise<Room[]> {
    const { search } = filterDto;
    const query = this.createQueryBuilder('room');

    query.where('room.userId = :userId', { userId: user.id });

    if (search) {
      query.andWhere(
        '(LOWER(room.name) LIKE LOWER(:search) OR LOWER(room.description) LIKE LOWER(:search))',
        { search: `%${search}%` },
      );
    }

    const rooms = query.getMany();
    return rooms;
  }

  async createRoom(createRoomDto: CreateRoomDto, user: User): Promise<Room> {
    const { name, description, work, materials } = createRoomDto;

    const room = new Room();
    room.name = name;
    room.description = description;
    room.work = work;
    room.materials = materials;
    room.user = user;

    await room.save();

    delete room.user;
    return room;
  }
}
