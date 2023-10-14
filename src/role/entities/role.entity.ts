import { Menu } from 'src/menu/entities/menu.entity'
import { Common } from 'src/shared/entities/common.entity'
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm'

@Entity()
export class Role extends Common {
  @Column()
  name: string

  @Column()
  introduce: string

  @ManyToMany(() => Menu, (menu) => menu.roles)
  @JoinTable({
    name: 'role_menu',
  })
  menus: Menu[]
}
