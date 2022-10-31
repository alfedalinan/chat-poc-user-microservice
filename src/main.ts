import { ValidationPipe } from '@nestjs/common'
import { HttpAdapterHost, NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { GenericFilter } from './shared/filters/generic.filter'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const httpAdapter = app.get(HttpAdapterHost)

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }))
  app.useGlobalFilters(new GenericFilter(httpAdapter))
  
  const port = process.env.SERVER_PORT || 3000
  await app.listen(port)
}
bootstrap();
