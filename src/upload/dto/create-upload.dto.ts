import { ApiProperty } from '@nestjs/swagger'
import Multer from 'multer'

export class UploadDto {
  @ApiProperty({
    example: 'xxx文件',
  })
  size: number

  // @IsString()
  // @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    format: 'binary',
    required: false,
  })
  file: Multer.File

  // @IsNumber()
  // @IsNotEmpty()
  user_id: number
}
