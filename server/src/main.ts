import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{
  });
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 8082;
  await app.listen(port);
  console.log(`Application is running on port ${port}`);
}
bootstrap();