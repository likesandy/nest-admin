import { Body, Controller, Get, Post, Query, UseFilters } from '@nestjs/common'
import { TypeormFilter } from 'src/filter/typeorm.filter'
import { CreateUserDto } from './dto/create-user.dto'
import { getUserDto } from './dto/get-user.dto'
import { UserService } from './user.service'

@UseFilters(TypeormFilter)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // 获取用户列表
  @Get()
  getUsers(@Query() query: getUserDto) {
    return this.userService.findAll(query)
  }

  // 创建用户
  @Post('/create')
  addUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto)
  }

  @Get('/profile')
  getProfile(@Query('id') id: number) {
    return this.userService.findProfile(id)
  }

  @Get('/log')
  getLog(@Query('id') id: number) {
    return this.userService.findUserLog(id)
  }

  @Get('/log/result')
  async getLogResult(@Query('id') id: number) {
    const res = await this.userService.findUserLogsByGroup(id)
    return res.map((item) => ({
      result: item.result,
      count: item.count,
    }))
  }
}
