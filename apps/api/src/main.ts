import { NestFactory } from '@nestjs/core'
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify'
import { AppModule } from './app.module'
import { LoggerService } from './logger/logger.service'

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    {
      cors: true,
      logger: new LoggerService(),
    }
  )

  await app.listen(3001, '0.0.0.0')
  console.log(`Application is running on: ${await app.getUrl()}`)
}
bootstrap()
