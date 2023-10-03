import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import { cryptoPassword } from 'src/share/utils/cryptoGather.util'
import { User } from 'src/user/entities/user.entity'
import { UserService } from 'src/user/user.service'
import { Repository } from 'typeorm'
import { LoginDTO } from './dto/login.dto'
@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async checkLoginForm(loginDto: LoginDTO) {
    const { username, password } = loginDto
    const user = await this.userRepository.findOneBy({
      username,
    })

    if (!user) {
      throw new NotFoundException('用户不存在')
    }

    const { password: dbPassword, salt } = user
    const currentHashPassword = cryptoPassword(password, salt)
    if (currentHashPassword !== dbPassword) throw new NotFoundException('密码错误')
    return user
  }

  /**
   * 生成token
   * @param user
   * @returns
   */
  async certificate(user: User) {
    const payload = {
      id: user.id,
    }
    const token = this.jwtService.sign(payload)
    return token
  }

  /**
   * 登录
   * @param login
   * @returns
   */
  async login(login: LoginDTO) {
    const user = await this.checkLoginForm(login)

    const token = this.certificate(user)
    return {
      data: token,
    }
  }

  // // 注册
  // async signup(username: string, password: string) {
  //   const user = await this.usersService.find(username)

  //   if (user) throw new ForbiddenException('用户已存在')

  //   return this.usersService.create({ username, password })
  // }
}
