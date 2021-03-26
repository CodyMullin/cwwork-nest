import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../auth/user.entity';
import { Room } from '../rooms/room.entity';

@Entity()
export class Work extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  material: string;

  @Column()
  area: number;

  @Column()
  workCost: string;

  @ManyToOne(() => User, (user) => user.works, { eager: false })
  user: User;

  @ManyToOne(() => Room, (room) => room.works)
  room: Room;

  @Column()
  userId: number;
}
