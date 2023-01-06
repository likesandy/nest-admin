import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common'
import { QueryFailedError, TypeORMError } from 'typeorm'

@Catch(TypeORMError)
export class TypeormFilter<T> implements ExceptionFilter {
  catch(exception: TypeORMError, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse()

    let code = 500
    let message = exception.message
    if (exception instanceof QueryFailedError) {
      code = exception.driverError.errno
      if (exception.driverError.errno === 1062) message = '该字段的数据不能重复'
    }

    response.status(500).json({
      code,
      timestamp: new Date().toISOString(),
      message,
    })
  }
}
