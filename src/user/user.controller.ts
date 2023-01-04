import { Body, Controller, Get, Post, Query } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { getUserDto } from './dto/get-user.dto'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // 获取用户列表
  @Get()
  getUsers(@Query() query: getUserDto) {
    return this.userService.findAll(query)
  }

  // 添加用户
  @Post('/add')
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
