import { Module } from '@nestjs/common';
import { MemoModule } from './memo/memo.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Memo } from './memo/memo.entity';
import { ConfigurationModule } from './config.module';
import { AuthModule } from './auth/auth.module';
import config from './config';
import { User } from './auth/user.entity';

@Module({
  imports: [
    MemoModule,
    TypeOrmModule.forRoot({
      type: config.DATABASE.TYPE,
      host: config.DATABASE.HOST,
      port: config.DATABASE.PORT,
      username: config.DATABASE.USER_NAME,
      password: config.DATABASE.PASSWORD,
      database: config.DATABASE.DATABASE_NAME,
      entities: [Memo, User],
      synchronize: true,
    }),
    ConfigurationModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
