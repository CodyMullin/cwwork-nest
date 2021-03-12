import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { EstimateStatus } from './estimate-status.enum';
import { User } from '../auth/user.entity';

@Entity()
export class Estimate extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  customerName: string;

  @Column()
  status: EstimateStatus;

  @ManyToOne(() => User, (user) => user.estimates, { eager: false })
  user: User;

  @Column()
  userId: number;
}
