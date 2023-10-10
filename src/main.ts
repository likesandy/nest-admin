// main.ts
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { join } from 'path'
import { AppModule } from './app.module'
import { NestExpressApplication } from '@nestjs/platform-express'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  // const httpAdapter = app.get(HttpAdapterHost)
  // app.useGlobalFilters(new AllExceptionsFilter(Logger, httpAdapter))

  const options = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .build()

  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('/api', app, document)
  app.enableCors()

  // 开启静态资源
  const uploadDir =
    !!process.env.UPLOAD_DIR && process.env.UPLOAD_DIR !== ''
      ? process.env.UPLOAD_DIR
      : join(__dirname, '../..', 'static/upload')
  console.log(uploadDir)

  app.useStaticAssets(uploadDir, {
    prefix: '/static/upload',
  })

  await app.listen(3000)
}
bootstrap()
