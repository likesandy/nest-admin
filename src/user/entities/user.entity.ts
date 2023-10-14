import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Logs } from '../../logs/entities/logs.entity'
import { Profile } from './profile.entity'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  // 唯一索引
  @Column({ unique: true })
  username: string

  @Column()
  password: string

  @OneToOne(() => Profile, (profile) => profile.user, { cascade: true })
  profile: Profile

  // * 一对多关联
  // https://typeorm.io/many-to-one-one-to-many-relations
  @OneToMany(() => Logs, (logs) => logs.user)
  logs: Logs[]

  // * 多对多关联
  // https://typeorm.io/many-to-many-relations
  // @ManyToMany(() => Roles, (roles) => roles.user)
  // @JoinTable({ name: 'user_roles' })
  // roles: Roles[]

  // 加密盐
  @Column({
    type: 'text',
    select: false,
  })
  salt: string
}
