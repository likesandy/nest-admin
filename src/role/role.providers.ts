import { User } from 'src/user/entities/user.entity'
import { DataSource } from 'typeorm'
import { Role } from './entities/role.entity'
import { Menu } from 'src/menu/entities/menu.entity'

export const RoleProviders = [
  {
    provide: 'USER_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'ROLE_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Role),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'MENU_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Menu),
    inject: ['DATA_SOURCE'],
  },
]
