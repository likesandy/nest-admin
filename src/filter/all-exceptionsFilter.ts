// filter/all-exceptionsFilter.ts
import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, LoggerService } from '@nestjs/common'
import { HttpAdapterHost } from '@nestjs/core'
import { Request, Response } from 'express'

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  // HttpAdapterHost对象提供了获取和设置底层HttpAdapter的方法。
  constructor(private readonly logger: LoggerService, private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    // HttpAdapter是一个围绕底层本地HTTP服务器库（例如Express）的包装器
    const { httpAdapter } = this.httpAdapterHost

    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()

    // 通过异常对象的状态码来判断异常类型
    const httpStatus = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR

    const responseBody = {
      statusCode: httpStatus,
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(request),
      methods: httpAdapter.getRequestMethod(request.method),
      message: exception['message'] || exception['name'] || 'Internal Server Error',
    }

    // 记录error日志
    this.logger.error('AllExceptionsFilter', responseBody)
    httpAdapter.reply(response, responseBody, httpStatus)
  }
}
