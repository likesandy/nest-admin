import { Body, Controller, Get, Post } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { CreateMenuDto } from './dto/create-menu.dto'
import { MenuService } from './menu.service'

@ApiTags('菜单管理')
@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get()
  @ApiOperation({
    summary: '获取菜单',
  })
  findAll() {
    return this.menuService.findAll()
  }

  @Post()
  @ApiOperation({
    summary: '新增菜单',
  })
  create(@Body() createMenuDto: CreateMenuDto) {
    return this.menuService.create(createMenuDto)
  }
}
