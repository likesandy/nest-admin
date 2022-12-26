import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  gender: number;

  @Column()
  photo: string;

  @Column()
  address: string;

  // * 双向关联
  // https://typeorm.io/one-to-one-relations
  @OneToOne(() => User, (user) => user.profile)
  @JoinColumn()
  user: User;
}
