import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CategoryStatus } from './category-status.enum';
import { User } from '../auth/user.entity';

@Entity()
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  active: CategoryStatus;

  @ManyToOne((type) => User, (user) => user.categories, { eager: false })
  user: User;

  @Column()
  userId: number;
}
