import { Global, Module } from '@nestjs/common'
import { DatabaseModule } from 'src/db/database.module'
import { UserController } from './user.controller'
import { UserProviders } from './user.providers'
import { UserService } from './user.service'

@Global()
@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [UserService, ...UserProviders],
  exports: [UserService],
})
export class UserModule {}
