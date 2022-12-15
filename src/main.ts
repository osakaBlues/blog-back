import { VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import {
  BLOG_URL_PRIFIX,
  BLOG_VERSION,
  BLOG_TITLE,
  BLOG_PORT,
  BLOG_DOCS_URL,
} from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.setGlobalPrefix('api');
  const config = new DocumentBuilder()
    .setTitle(BLOG_TITLE)
    .setDescription('간단한 블로그를 만들어보자')
    .setVersion(BLOG_VERSION)
    .addServer(BLOG_URL_PRIFIX)
    .build();
  const documet = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(BLOG_DOCS_URL, app, documet);
  await app.listen(BLOG_PORT);
}
bootstrap();
