import { Module } from '@nestjs/common';
import { PostModule } from './post/post.module';
import { MemoController } from './memo/memo.controller';
import { MemoService } from './memo/memo.service';
import { MemoModule } from './memo/memo.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './config/typeorm.config';

@Module({
  imports: [PostModule, MemoModule, TypeOrmModule.forRoot(typeORMConfig)],
  controllers: [MemoController],
  providers: [MemoService],
})
export class AppModule {}
