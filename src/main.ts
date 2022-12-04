import { VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Osaka Blues Blog')
    .setDescription('간단한 블로그를 만들어보자')
    .setVersion('1.0')
    .build();
  const documet = SwaggerModule.createDocument(app, config);
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.setGlobalPrefix('api');
  SwaggerModule.setup('docs', app, documet);
  await app.listen(3000);
  ``;
}
bootstrap();
