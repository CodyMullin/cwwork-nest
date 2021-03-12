import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../auth/user.entity';

@Entity()
export class Room extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  work: string;

  @Column('text', { array: true })
  materials: string[];

  @ManyToOne(() => User, (user) => user.rooms, { eager: false })
  user: User;

  @Column()
  userId: number;
}
