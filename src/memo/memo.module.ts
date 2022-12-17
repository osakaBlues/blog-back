import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemoController } from './memo.controller';
import { Memo } from './memo.entity';
import { MemoService } from './memo.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Memo]), AuthModule],
  controllers: [MemoController],
  providers: [MemoService],
})
export class MemoModule {}
