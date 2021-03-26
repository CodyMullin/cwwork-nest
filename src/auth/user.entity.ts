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
import { Work } from '../work/work.entity';

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

  @OneToMany(() => Material, (material) => material.user, { eager: true })
  materials: Material[];

  @OneToMany(() => Customer, (customer) => customer.user, { eager: true })
  customers: Customer[];

  @OneToMany(() => Category, (category) => category.user, { eager: true })
  categories: Category[];

  @OneToMany(() => Estimate, (estimate) => estimate.user, { eager: true })
  estimates: Estimate[];

  @OneToMany(() => Room, (room) => room.user, { eager: true })
  rooms: Room[];

  @OneToMany(() => Work, (work) => work.user, { eager: true })
  works: Work[];

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
