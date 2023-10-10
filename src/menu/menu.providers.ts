import { DataSource } from 'typeorm'
import { Menu } from './entities/menu.entity'

export const MenuProviders = [
  {
    provide: 'MENU_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Menu),
    inject: ['DATA_SOURCE'],
  },
]
