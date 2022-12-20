import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigurationModule } from './config/config.module';
import { AuthModule } from './auth/auth.module';
import config from './config/config';
import { User } from './auth/user.entity';
import { CategoryModule } from './category/category.module';
import { Category } from './category/category.entity';
import { Board } from './board/board.entity';
import { BoardModule } from './board/board.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: config.DATABASE.TYPE,
      host: config.DATABASE.HOST,
      port: config.DATABASE.PORT,
      username: config.DATABASE.USER_NAME,
      password: config.DATABASE.PASSWORD,
      database: config.DATABASE.DATABASE_NAME,
      entities: [User, Category, Board],
      synchronize: true,
    }),
    ConfigurationModule,
    AuthModule,
    CategoryModule,
    BoardModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
