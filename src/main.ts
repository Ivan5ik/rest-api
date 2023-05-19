import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.setGlobalPrefix('api/v1'); //спільний початок мапінгу для всіх контролерів
  await app.listen(3000);
}
bootstrap();
