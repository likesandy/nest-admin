import { Logger, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ormConfig } from '../orm.config'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { LogsModule } from './logs/logs.module'
import { RolesModule } from './roles/roles.module'
import { UserModule } from './user/user.module'
import * as dotenv from 'dotenv'
import * as Joi from 'joi'

const envFilePath = `.env.${process.env.NODE_ENV || 'development'}`

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath,
      load: [() => dotenv.config({ path: '.env' })],
      validationSchema: Joi.object({
        LOG_ON: Joi.boolean().required(),
      }),
    }),
    TypeOrmModule.forRoot(ormConfig),
    UserModule,
    RolesModule,
    LogsModule,
  ],
  controllers: [AppController],
  providers: [AppService, Logger],
  exports: [Logger],
})
export class AppModule {}
