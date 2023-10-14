import { Module } from '@nestjs/common'
import { RolesService } from './role.service'
import { RolesController } from './role.controller'
import { DatabaseModule } from 'src/db/database.module'
import { RoleProviders } from './role.providers'
import { MenuService } from 'src/menu/menu.service'

@Module({
  imports: [DatabaseModule],
  controllers: [RolesController],
  providers: [RolesService, ...RoleProviders, MenuService],
})
export class RolesModule {}
