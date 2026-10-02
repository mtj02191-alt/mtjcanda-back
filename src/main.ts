import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule, ObserveInstrument } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    instrument: ObserveInstrument,
  });
  const configService = app.get(ConfigService);
  app.enableCors({
    origin: configService.getOrThrow<string>('FRONTEND_URL'),
  });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  const swaggerConfig = new DocumentBuilder()
    .setTitle('MTJ Canada API')
    .setDescription('REST API for MTJ Canada public submissions')
    .setVersion('1.0')
    .build();
  SwaggerModule.setup('api', app, SwaggerModule.createDocument(app, swaggerConfig));

  await app.listen(configService.get<number>('PORT', 3001));
  console.log('Starting MTJ Canada API on port 3001...');
}
await bootstrap();
