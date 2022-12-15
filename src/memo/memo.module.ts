import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemoController } from './memo.controller';
import { Memo } from './memo.entity';
import { MemoRepository } from './memo.repository';
import { MemoService } from './memo.service';

@Module({
  imports: [TypeOrmModule.forFeature([Memo])],
  controllers: [MemoController],
  providers: [MemoService, MemoRepository],
})
export class MemoModule {}
