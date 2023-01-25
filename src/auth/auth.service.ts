import { ForbiddenException, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UserService } from 'src/user/user.service'

@Injectable()
export class AuthService {
  constructor(private usersService: UserService, private jwt: JwtService) {}

  async signin(username: string, password: string) {
    const user = await this.usersService.find(username)

    if (!user) {
      throw new ForbiddenException('用户不存在，请注册')
    }

    if (!user && user.password === password) throw new ForbiddenException('用户名或者密码错误')
    return await this.jwt.signAsync({
      username: user.username,
      sub: user.id,
    })
  }
}
