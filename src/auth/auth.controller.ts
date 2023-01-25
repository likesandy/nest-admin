import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { JwtGuard } from 'src/guard/jwt.guard'
import { AuthService } from './auth.service'
import { SigninUserDto } from './dto/signin.dto'

@Controller('auth')
// @UseGuards(JwtGuard)
export class AuthController {
  constructor(private authService: AuthService) {}

  // 注册
  @Post('signup')
  signUp(@Body() dto: SigninUserDto) {
    const { username, password } = dto
    return this.authService.signup(username, password)
  }

  // 登录
  @Post('signin')
  async signIn(@Body() dto: SigninUserDto) {
    const { username, password } = dto
    const token = await this.authService.signin(username, password)
    return { token }
  }
}
