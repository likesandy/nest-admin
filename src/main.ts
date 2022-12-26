// main.ts
import { Logger } from '@nestjs/common'
import { HttpAdapterHost, NestFactory } from '@nestjs/core'
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston'
import { AppModule } from './app.module'
import { AllExceptionsFilter } from './filter/all-exceptionsFilter'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER))
  const httpAdapter = app.get(HttpAdapterHost)
  app.useGlobalFilters(new AllExceptionsFilter(Logger, httpAdapter))
  await app.listen(3000)
}
bootstrap()
