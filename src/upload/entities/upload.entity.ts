import { User } from 'src/user/entities/user.entity'
import { Column, ManyToOne, PrimaryColumn } from 'typeorm'

export class Upload {
  @PrimaryColumn()
  id: number

  @Column()
  filename: string
  size: number

  @ManyToOne(() => User, (user) => user.id)
  user_id: number
}
