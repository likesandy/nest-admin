import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
// fs扩展
import { ensureDir, outputFile, readFile } from 'fs-extra'
import { join } from 'path'
import { Repository } from 'typeorm'
import { Upload } from './entities/upload.entity'
import { cryptoFileHash } from 'src/share/utils/cryptoGather.util'

@Injectable()
export class UploadService {
  constructor(@InjectRepository(Upload) private uploadRepository: Repository<Upload>) {}

  async upload(file): Promise<{
    url: string
    path: string
  }> {
    // 存储文件夹路径
    const uploadDir =
      !!process.env.UPLOAD_DIR && process.env.UPLOAD_DIR !== ''
        ? process.env.UPLOAD_DIR
        : join(__dirname, '../../..', 'static/upload')
    await ensureDir(uploadDir)

    // 获取文件签名（hash)
    const sign = cryptoFileHash(file.buffer)
    // 获取文件后缀
    const fileType = file.originalname.split('.').pop()
    // 获取文件名
    const fileName = `${sign}.${fileType}`
    // 获取上传路径
    const uploadPath = join(uploadDir, fileName)
    // 上传文件
    await outputFile(uploadPath, file.buffer)

    return {
      url: '/static/upload/' + fileName,
      path: uploadPath,
    }
  }

  findAll() {
    return `This action returns all upload`
  }

  findOne(id: number) {
    return `This action returns a #${id} upload`
  }

  remove(id: number) {
    return `This action removes a #${id} upload`
  }
}
