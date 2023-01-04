export interface getUserDto {
  // 页码
  page: number
  // 每页数量
  limit?: number
  // 用户名
  username?: string
  // 角色对应的id
  role?: number
  // 性别
  gender: number
}
