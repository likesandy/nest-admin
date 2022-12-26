// orm.config.ts
import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { DataSource, DataSourceOptions } from 'typeorm'
import { Logs } from './src/logs/entities/logs.entity'
import { Roles } from './src/roles/entities/role.entity'
import { Profile } from './src/user/entities/profile.entity'
import { User } from './src/user/entities/user.entity'

// TypeOrmModule使用这个配置
export const ormConfig = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'ilun',
  synchronize: true,
  entities: [User, Profile, Logs, Roles],
  logging: false,
} as TypeOrmModuleOptions

// TypeORMCli使用这个配置
export default new DataSource({ ...ormConfig, migrations: ['src/migrations/**'], subscribers: [] } as DataSourceOptions)
