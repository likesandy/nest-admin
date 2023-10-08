import { Body, Controller, Post } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { AuthService } from './auth.service'
import { LoginDTO } from './dto/login.dto'

@ApiTags('认证鉴权')
@Controller('auth')
// @UseGuards(JwtGuard)
export class AuthController {
  constructor(private authService: AuthService) {}
  // 登录
  @ApiOperation({
    summary: '用户登录',
  })
  @Post('login')
  async signIn(@Body() loginDto: LoginDTO) {
    return await this.authService.login(loginDto)
  }
}
