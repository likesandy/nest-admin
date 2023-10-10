import { Logs } from 'src/logs/entities/logs.entity'
import { DataSource } from 'typeorm'
import { User } from './entities/user.entity'

export const UserProviders = [
  {
    provide: 'USER_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'LOG_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Logs),
    inject: ['DATA_SOURCE'],
  },
]
