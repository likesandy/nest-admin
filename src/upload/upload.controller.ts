import { Body, Controller, Get, Post, Req, UploadedFile, UseInterceptors } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { ApiConsumes } from '@nestjs/swagger'
import { UploadDto } from './dto/create-upload.dto'
import { UploadService } from './upload.service'

// 文件命名方案
// - 文件原名：重复文件会进行覆盖
// - 时间戳：同时提交可能会出现覆盖（n个用户同时提交）
// - 随机值：多次提交占用空间
// - hash：同一个文件产生同一个hash值
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  async upload(@Req() req: any, @Body() uploadDto: UploadDto, @UploadedFile() file) {
    const { url } = await this.uploadService.upload(file)
    return {
      data: url,
    }
  }

  @Get()
  findAll() {
    return this.uploadService.findAll()
  }
}
