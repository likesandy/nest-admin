import { ForbiddenException, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UserService } from 'src/user/user.service'
import * as argon2 from 'argon2'
@Injectable()
export class AuthService {
  constructor(private usersService: UserService, private jwt: JwtService) {}

  async signin(username: string, password: string) {
    const user = await this.usersService.find(username)

    if (!user) throw new ForbiddenException('用户不存在，请注册')

    const isPasswordVerify = await argon2.verify(user.password, password)
    if (!isPasswordVerify) throw new ForbiddenException('用户名或者密码错误')

    return await this.jwt.signAsync({
      username: user.username,
      sub: user.id,
    })
  }

  // 注册
  async signup(username: string, password: string) {
    const user = await this.usersService.find(username)

    if (user) throw new ForbiddenException('用户已存在')

    return this.usersService.create({ username, password })
  }
}
