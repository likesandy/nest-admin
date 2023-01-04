// logs/logs.module.ts
import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { utilities, WinstonModule, WinstonModuleOptions } from 'nest-winston'
import * as winston from 'winston'
import 'winston-daily-rotate-file'
import { Console, DailyRotateFile } from 'winston/lib/winston/transports'
import { LogEnum } from '../enum/config.enum'

const createDailyRotateFileTransport = (level: string, path: string) => {
  return new DailyRotateFile({
    // 等级
    level,
    // 保存路径
    dirname: 'logs',
    // 日志名
    filename: `${path}-%DATE%.log`,
    // 时期格式
    datePattern: 'YYYY-MM-DD-HH',
    // 压缩
    zippedArchive: true,
    // 一个文件的最大大小
    maxSize: '20m',
    // 文件的最长保存时间
    maxFiles: '14d',
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.ms(),
      // 简单打印
      winston.format.simple(),
    ),
  })
}

@Module({
  imports: [
    WinstonModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const consoleTransport = new Console({
          format: winston.format.combine(
            // 时间戳
            winston.format.timestamp(),
            // 毫秒
            winston.format.ms(),
            // 特殊格式化
            utilities.format.nestLike(),
          ),
        })
        // 是否开启日志
        return {
          transports: [
            consoleTransport,
            ...(configService.get(LogEnum.LOG_ON)
              ? [
                  createDailyRotateFileTransport('info', 'application'),
                  createDailyRotateFileTransport('error', 'error'),
                ]
              : []),
          ],
        } as WinstonModuleOptions
      },
    }),
  ],
})
export class LogsModule {}
