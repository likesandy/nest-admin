import { Inject, Injectable } from '@nestjs/common'
import { MenuService } from 'src/menu/menu.service'
import { Repository } from 'typeorm'
import { CreateRoleDto } from './dto/create-role.dto'
import { UpdateRoleDto } from './dto/update-role.dto'
import { Role } from './entities/role.entity'

@Injectable()
export class RolesService {
  constructor(
    @Inject('ROLE_REPOSITORY')
    private readonly roleRepository: Repository<Role>,
    private readonly menuService: MenuService,
  ) {}

  async create(createRoleDto: CreateRoleDto) {
    await this.roleRepository.createQueryBuilder('role').insert().values(createRoleDto).execute()

    return {
      data: {
        msg: '创建角色成功',
      },
    }
  }

  findAll() {
    return this.roleRepository.createQueryBuilder('role').getMany()
  }

  findOne(id: number) {
    return `This action returns a #${id} role`
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return `This action updates a #${id} role`
  }

  remove(id: number) {
    return `This action removes a #${id} role`
  }

  async assignAuthority(roleId: number, menuIds: number[]) {
    try {
      // 删除原来的权限
      await this.roleRepository
        .createQueryBuilder()
        .relation(Role, 'menus')
        .of(roleId)
        .remove(menuIds)

      // 创建新的权限
      await this.roleRepository.createQueryBuilder().relation(Role, 'menus').of(roleId).add(menuIds)
      return {
        data: {
          msg: '分配权限成功~',
        },
      }
    } catch (error) {
      console.log('🚀 ~ file: role.service.ts:51 ~ RolesService ~ assignAuthority ~ error:', error)
    }
  }

  async getRoleMenus(roleId: string) {
    const role = await this.roleRepository
      .createQueryBuilder('role')
      .leftJoinAndSelect('role.menus', 'menu')
      .where('role.id = :roleId', { roleId })
      .getOne()

    if (role) {
      // 获取角色的菜单
      const filteredMenus = role.menus.filter((menu) => menu.parentId === null) // 过滤出顶级菜单

      // 根据菜单的 parentId 找到父元素，并将子元素添加到父元素的 children 属性中(递归)
      const findChildren = (menus) => {
        menus.forEach((menu) => {
          const children = role.menus.filter((item) => item.parentId === menu.id)
          if (children.length > 0) {
            menu.children = children
            findChildren(children)
          }
        })
      }
      findChildren(filteredMenus)

      return filteredMenus
    } else {
      // 处理角色不存在的情况
    }
  }
}
