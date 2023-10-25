import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { AllConfigType } from './config/config.type';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const configService = app.get(ConfigService<AllConfigType>);
  await app.listen(configService.getOrThrow('app.port', { infer: true }));
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
