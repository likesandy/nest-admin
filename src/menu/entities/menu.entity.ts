import { Role } from 'src/role/entities/role.entity'
import { Common } from 'src/shared/entities/common.entity'
import { Column, Entity, ManyToMany } from 'typeorm'

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

  @Column({ nullable: true })
  path?: string

  @Column({ nullable: true })
  permission?: string

  @ManyToMany(() => Role, (role) => role.menus)
  roles: Role[]
}
