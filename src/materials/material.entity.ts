import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MaterialStatus } from './material-status.enum';
import { User } from '../auth/user.entity';

@Entity()
export class Material extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  salesCost: string;

  @Column()
  purchaseCost: string;

  @Column()
  installCost: string;

  @Column()
  active: MaterialStatus;

  @Column()
  category: string;

  @Column()
  measurement: string;

  @ManyToOne(() => User, (user) => user.materials, { eager: false })
  user: User;

  @Column()
  userId: number;
}
