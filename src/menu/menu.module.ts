import { Module } from '@nestjs/common'
import { DatabaseModule } from 'src/db/database.module'
import { MenuController } from './menu.controller'
import { MenuService } from './menu.service'
import { MenuProviders } from './menu.providers'

@Module({
  imports: [DatabaseModule],
  controllers: [MenuController],
  providers: [MenuService, ...MenuProviders],
})
export class MenuModule {}
