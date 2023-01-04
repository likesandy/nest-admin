import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Logs } from '../logs/entities/logs.entity'
import { CreateUserDto } from './dto/create-user.dto'
import { getUserDto } from './dto/get-user.dto'
import { User } from './entities/user.entity'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Logs)
    private logsRepository: Repository<Logs>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.userRepository.create(createUserDto)
    return this.userRepository.save(user)
  }

  remove(id: number) {
    return this.userRepository.delete({ id })
  }

  update(id: number, updateUserDto: CreateUserDto) {
    return this.userRepository.update(id, updateUserDto)
  }

  find(username: string) {
    return this.userRepository.findOne({ where: { username } })
  }

  findAll(query: getUserDto) {
    const { page, limit, username, role, gender } = query
    const take = limit || 10
    const skip = ((page || 1) - 1) * take
    return this.userRepository.find({
      select: {
        id: true,
        username: true,
        profile: {
          gender: true,
        },
      },
      relations: {
        profile: true,
        roles: true,
      },
      where: {
        username,
        roles: {
          id: role,
        },
        profile: {
          gender,
        },
      },
      take,
      skip,
    })
  }

  findOne(id: number) {
    return this.userRepository.find({ where: { id } })
  }

  // * 联合查询
  findProfile(id: number) {
    return this.userRepository.find({
      where: {
        id,
      },
      relations: {
        profile: true,
      },
    })
  }

  async findUserLog(id: number) {
    const user = await this.findOne(id)
    return this.logsRepository.find({
      where: {
        user,
      },
      relations: {
        user: true,
      },
    })
  }

  // * 高级查询
  // https://typeorm.io/select-query-builder
  // 查询用户日志结果中各种状态码的数量
  // select logs.result as result ,count(*) as count from logs where logs.userId = user.id group by result order by count desc
  findUserLogsByGroup(id: number) {
    return this.logsRepository
      .createQueryBuilder('logs')
      .select('logs.result', 'result')
      .addSelect('COUNT(*)', 'count')
      .leftJoinAndSelect('logs.user', 'user')
      .where('user.id = :id', { id })
      .groupBy('logs.result')
      .orderBy('count', 'DESC')
      .getRawMany()
    // 也可以使用原生sql
    return this.logsRepository.query(
      'select logs.result as result ,count(*) as count from logs where logs.userId = ? group by result order by count desc',
      [id],
    )
  }
}
