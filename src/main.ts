import { Logger, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import config from './config';

async function bootstrap() {
  const logger = new Logger('Main');
  logger.log(`${config.DATABASE.TYPE}`);
  const app = await NestFactory.create(AppModule);
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.setGlobalPrefix('api');
  const configApp = new DocumentBuilder()
    .setTitle(config.BLOG.TITLE)
    .setDescription('간단한 블로그를 만들어보자')
    .setVersion(config.BLOG.VERSION)
    .addServer(config.BLOG.URL_PRIFIX)
    .build();
  const documet = SwaggerModule.createDocument(app, configApp);
  SwaggerModule.setup(config.BLOG.DOCS_URL, app, documet);
  await app.listen(config.BLOG.PORT);
}
bootstrap();
