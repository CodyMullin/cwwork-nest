import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Material } from 'src/materials/material.entity';
import { Customer } from 'src/customers/customer.entity';
import { Category } from '../categories/category.entity';
import { Estimate } from '../estimates/estimate.entity';
import { Room } from '../rooms/room.entity';

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: String;

  @Column()
  password: string;

  @Column()
  salt: string;

  @OneToMany((type) => Material, (material) => material.user, { eager: true })
  materials: Material[];

  @OneToMany((type) => Customer, (customer) => customer.user, { eager: true })
  customers: Customer[];

  @OneToMany((type) => Category, (category) => category.user, { eager: true })
  categories: Category[];

  @OneToMany((type) => Estimate, (estimate) => estimate.user, { eager: true })
  estimates: Estimate[];

  @OneToMany((type) => Room, (room) => room.user, { eager: true })
  rooms: Room[];

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
