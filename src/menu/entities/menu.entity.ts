import { Common } from 'src/shared/entities/common.entity'
import { Column, Entity } from 'typeorm'

@Entity()
export class Menu extends Common {
  @Column()
  title: string

  @Column()
  type: number

  @Column({ nullable: true })
  icon?: string

  @Column({ nullable: true })
  parentId?: number

  @Column()
  path: string

  @Column({ nullable: true })
  permission?: string
}
