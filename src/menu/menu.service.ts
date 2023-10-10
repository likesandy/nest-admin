import { Inject, Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { CreateMenuDto } from './dto/create-menu.dto'
import { UpdateMenuDto } from './dto/update-menu.dto'
import { Menu } from './entities/menu.entity'

@Injectable()
export class MenuService {
  constructor(
    @Inject('MENU_REPOSITORY')
    private menuRepository: Repository<Menu>,
  ) {}

  // 创建菜单
  async create(createMenuDto: CreateMenuDto) {
    await this.menuRepository.save(createMenuDto)
    return {
      data: {
        msg: '创建成功',
      },
    }
  }

  // 查询所有菜单
  async findAll() {
    const menu = await this.menuRepository
      .createQueryBuilder('m1')
      .select([
        'm1.id id',
        'm1.title title',
        'm1.type type',
        'm1.path path',
        'm1.icon icon',
        'm1.created_at created_at',
        'm1.updated_at updated_at',
        `(SELECT JSON_ARRAYAGG(
      JSON_OBJECT('id', m2.id, 'title', m2.title, 'type', m2.type, 'parentId', m2.parentId, 'path', m2.path, 'created_at', m2.created_at, 'updated_at', m2.updated_at,'icon', m2.icon,
      'children', (SELECT JSON_ARRAYAGG(
        JSON_OBJECT('id', m3.id, 'title', m3.title, 'type', m3.type, 'parentId', m3.parentId, 'path', m3.path,'icon', m3.icon, 'permission', m3.permission, 'created_at', m3.created_at, 'updated_at', m3.updated_at)
      ) FROM menu m3 WHERE m3.parentId = m2.id))
    ) FROM menu m2 WHERE m1.id = m2.parentId) children`,
      ])
      .where('m1.type = :type', { type: 1 })
      .getRawMany()
    return {
      data: menu,
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} menu`
  }

  update(id: number, updateMenuDto: UpdateMenuDto) {
    return `This action updates a #${id} menu`
  }

  remove(id: number) {
    return `This action removes a #${id} menu`
  }
}
