// orm.config.ts
import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { Logs } from 'src/logs/entities/logs.entity'
import { Menu } from 'src/menu/entities/menu.entity'
import { Roles } from 'src/roles/entities/role.entity'
import { Profile } from 'src/user/entities/profile.entity'
import { User } from 'src/user/entities/user.entity'
import { DataSource, DataSourceOptions } from 'typeorm'

// 判断当前环境，如果是测试环境，使用js文件，否则使用ts文件
// const entitiesDir =
//   process.env.NODE_ENV === 'test'
//     ? [`${dirname}/**/*.entity.ts`]
//     : [`${dirname}/**/*.entity{.js,.ts}`]

// TypeOrmModule使用这个配置
export const ormConfig = {
  type: 'mysql',
  host: '127.0.0.1',
  port: 3306,
  username: 'root',
  password: 'admin',
  database: 'nest',
  synchronize: true,
  entities: [Logs, User, Roles, Profile, Menu],
  logging: false,
} as TypeOrmModuleOptions

// TypeORMCli使用这个配置
// 查看data-source.ts发现多了migrations和subscribers option
// 因为兼容TypeORMCli，所以需要这两个option
// migrations:迁移文件目录
export default new DataSource({
  ...ormConfig,
  migrations: ['src/migrations/**'],
  subscribers: [],
} as DataSourceOptions)
