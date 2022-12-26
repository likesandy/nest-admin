import { Body, Controller, Get, Post, Query } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/list')
  getUser() {
    return this.userService.findAll()
  }

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
