import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CustomerStatus } from './customer-status.enum';
import { User } from '../auth/user.entity';

@Entity()
export class Customer extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  notes: string;

  @Column()
  email: string;

  @Column('text', { array: true })
  phoneNumber: string[];

  @Column()
  address: string;

  @Column()
  active: CustomerStatus;

  @Column()
  reference: string;

  @Column()
  preference: string;

  @ManyToOne((type) => User, (user) => user.customers, { eager: false })
  user: User;

  @Column()
  userId: number;
}
