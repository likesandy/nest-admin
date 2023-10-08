import { ApiProperty } from '@nestjs/swagger'
import { IsInt, IsNotEmpty, IsString, Length } from 'class-validator'

export class LoginDTO {
  @IsString()
  @IsNotEmpty()
  @Length(6, 20, {
    // $value: 当前用户传入的值
    // $property: 当前属性名
    // $target: 当前类
    // $constraint1: 最小长度 ...
    message: `用户名长度必须在$constraint1到$constraint2之间，当前传递的值是：$value`,
  })
  @ApiProperty({ example: 'admin', description: '用户名' })
  username: string

  @IsString()
  @IsNotEmpty()
  @Length(6, 64)
  @ApiProperty({ example: '123456', description: '密码' })
  password: string
}
