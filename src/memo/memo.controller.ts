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

@Controller('memo')
export class MemoController {
  constructor(private readonly memoService: MemoService) {}

  @Get()
  getAll(): Promise<Memo[]> {
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
