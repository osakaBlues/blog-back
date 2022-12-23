import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import config from './config/config';

async function bootstrap() {
  const logger = new Logger('Main');
  logger.log(`${config.DATABASE.TYPE}`);
  const app = await NestFactory.create(AppModule);
  const corsOptions = {
    origin: /\.osakablues\.site$/,
    methods: 'GET, PUT, POST, DELETE',
    optionSuccessStatus: 204,
  };
  app.enableCors(corsOptions);
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.setGlobalPrefix('api');
  // app.useGlobalPipes(new ValidationPipe({ transform: true }));
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
