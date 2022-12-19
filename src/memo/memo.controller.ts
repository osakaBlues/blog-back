import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Memo } from './memo.entity';
import MemoDto from './memo.dto';
import { MemoService } from './memo.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';

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
  @UseGuards(AuthGuard())
  create(@Body() dto: MemoDto, @GetUser() user: User): Promise<Memo> {
    return this.memoService.create(dto, user);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard())
  delete(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<void> {
    return this.memoService.delete(id, user);
  }
}
