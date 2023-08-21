import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import * as argon2 from 'argon2'
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

  find(username: string) {
    return this.userRepository.findOne({ where: { username }, relations: ['roles'] })
  }

  async create(createUserDto: CreateUserDto) {
    const user = await this.userRepository.create(createUserDto)

    user.password = await argon2.hash(user.password)

    return await this.userRepository.save(user)
  }

  findOne(id: number) {
    return this.userRepository.find({ where: { id } })
  }

  // delete删除用户(通过应该id删除一个或多个实例(硬删除)直接从数据库中删除)
  delete(id: number) {
    return this.userRepository.delete({ id })
  }

  // remove可以删除一个或多个实例,并且remove可以触发TypeORM的生命周期钩子
  async remove(id: number) {
    const user = await this.findOne(id)
    return this.userRepository.remove(user)
  }

  // 修改用户
  async patch(id: number, user: Partial<User>) {
    const userTemp = await this.findProfile(id)
    const newUser = this.userRepository.merge(userTemp, user)
    // 联合查询更新,需要使用save方法或者queryBuilder
    return this.userRepository.save(newUser)

    // update方法只适合单模型的更新,不适合有关系的模型更新
    // return this.userRepository.update(id, user)
  }

  async findAll({ page, limit }: getUserDto) {
    // const { page, limit, username, role, gender } = query
    // const take = limit || 10
    // const skip = ((page || 1) - 1) * take
    // * 查询条件
    // https://typeorm.io/#/find-options
    // return this.userRepository.find({
    //   select: {
    //     id: true,
    //     username: true,
    //   },
    //   relations: {
    //     profile: true,
    //     roles: true,
    //   },
    //   where: {
    //     username,
    //     roles: {
    //       id: role,
    //     },
    //     profile: {
    //       gender,
    //     },
    //   },
    //   take,
    //   skip,
    // })
    // return this.userRepository
    //   .createQueryBuilder('user')
    //   .leftJoinAndSelect('user.profile', 'profile')
    //   .leftJoinAndSelect('user.roles', 'roles')
    //   .where('user.username =  :username', { username })
    //   .andWhere('roles.id = :role', { role })
    //   .andWhere('profile.gender = :gender', { gender })
    //   .take()
    //   .skip()
    //   .select(['user.id', 'user.username', 'profile', 'roles'])
    //   .getMany()
    const [data, count] = await this.userRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit * 1,
      cache: true,
    })

    return {
      data,
      count,
    }
  }

  // * 联合查询
  findProfile(id: number) {
    return this.userRepository.findOne({
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
