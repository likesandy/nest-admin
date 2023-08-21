import { Module } from '@nestjs/common'
import { UploadService } from './upload.service'
import { UploadController } from './upload.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from 'src/user/entities/user.entity'
import { Upload } from './entities/upload.entity'

@Module({
  imports: [TypeOrmModule.forFeature([User, Upload])],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
