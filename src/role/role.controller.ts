import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common'
import { ApiProperty } from '@nestjs/swagger'
import { CreateRoleDto } from './dto/create-role.dto'
import { UpdateRoleDto } from './dto/update-role.dto'
import { RolesService } from './role.service'

@Controller('role')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  @ApiProperty({
    description: '创建角色',
  })
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto)
  }

  @Get()
  @ApiProperty({
    description: '获取角色列表',
  })
  findAll() {
    return this.rolesService.findAll()
  }

  @Post('/menu/:roleId')
  @ApiProperty({
    description: '给用户分配权限',
  })
  assignAuthority(@Param('roleId') roleId: string, @Body('menuIds') menuIds: number[]) {
    return this.rolesService.assignAuthority(+roleId, menuIds)
  }

  @Get('/menu/:roleId')
  @ApiProperty({
    description: '获取角色的菜单',
  })
  // 获取角色的菜单
  getRoleMenus(@Param('roleId') roleId: string) {
    return this.rolesService.getRoleMenus(roleId)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.update(+id, updateRoleDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rolesService.remove(+id)
  }
}
