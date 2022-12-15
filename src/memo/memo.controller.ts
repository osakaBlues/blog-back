import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { Memo } from './memo.entity';
import MemoDto from './memo.dto';
import { MemoService } from './memo.service';
import { ConfigService } from '@nestjs/config';

@Controller('memo')
export class MemoController {
  constructor(
    private readonly memoService: MemoService,
    private readonly configService: ConfigService,
  ) {}

  @Get()
  getAll(): Promise<Memo[]> {
    console.log(this.configService.get('DATABASE_HOST'));
    return this.memoService.getAll();
  }

  @Get('/:id')
  getOne(@Param('id', ParseIntPipe) id: number): Promise<Memo> {
    return this.memoService.getOne(id);
  }

  @Post()
  create(@Body() dto: MemoDto): Promise<Memo> {
    return this.memoService.create(dto);
  }
}
