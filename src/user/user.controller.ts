import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseFilters,
  UseInterceptors
} from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { TypeormFilter } from 'src/filter/typeorm.filter'
import { CreateUserDto } from './dto/create-user.dto'
import { getUserDto } from './dto/get-user.dto'
import { User } from './entities/user.entity'
import { UserService } from './user.service'

// @UseGuards(JwtGuard)
@UseFilters(TypeormFilter)
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('用户管理')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // 获取用户列表
  @Get()
  getUsers(@Query() query: getUserDto) {
    return this.userService.findAll(query)
  }

  // 创建用户
  @Post()
  @ApiOperation({
    summary: '新增用户',
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto)
  }

  @Get('/profile')
  getProfile(@Query('id') id: number): Promise<User> {
    return this.userService.findProfile(id)
  }

  // 修改用户
  @Patch('/:id')
  patch(@Body() dto: any, @Param('id') id: number) {
    const user = dto as User
    /**
     * "Property \"profile.address\" was not found in \"User\". Make sure your query is correct."
     * tpyorm cascade
     * @see https://typeorm.io/#/relations-faq/cascade-relations
     */
    return this.userService.patch(id, user)
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
