import { Module } from '@nestjs/common';
import { MemoModule } from './memo/memo.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Memo } from './memo/memo.entity';
import { ConfigurationModule } from './config.module';
import config from './config';

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
      entities: [Memo],
      synchronize: true,
    }),
    ConfigurationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
