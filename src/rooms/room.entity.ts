import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../auth/user.entity';
import { Work } from '../work/work.entity';

@Entity()
export class Room extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToOne(() => User, (user) => user.rooms, { eager: false })
  user: User;

  @OneToMany(() => Work, (work) => work.room)
  @JoinColumn()
  works: Work[];

  @Column()
  userId: number;
}
