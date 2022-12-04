import { Module } from '@nestjs/common';
import { PostModule } from './post/post.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 13306,
      username: 'root',
      password: 'root!',
      database: 'test',
      models: [],
    }),
    PostModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
