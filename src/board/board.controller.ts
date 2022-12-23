import {
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BoardDto } from 'src/dto/Board.dto';
import { BoardService } from './board.service';
import { Body, UseGuards } from '@nestjs/common/decorators';
import config from '../config/config';
import { GetUser } from 'src/auth/get-user.decorator';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/user.entity';
import { Board } from './board.entity';

/**
 * 블로그 글과 관련된 요청들을 받는 Controller
 * @decorator `@Controller`
 */
@ApiTags('Board와 관련된 request를 처리한다.')
@Controller({
  version: config.BLOG.VERSION,
  path: 'Boards',
})
export class BoardController {
  private readonly logger = new Logger(BoardController.name);
  constructor(private readonly boardService: BoardService) {}
  /**
   * id에 맞는 Board하나를 찾아서 리턴한다.
   * @param {String} id 찾을 Board의 id
   * @todo
   */
  @Get('/:id')
  @ApiOperation({ summary: 'id에 맞는 Board를 찾아서 리턴한다.' })
  @ApiResponse({
    status: 200,
    description: '해당 id의 포스트를 요청합니다.',
    type: String,
  })
  @ApiResponse({ status: 404, description: 'id가 숫자가 아닙니다.' })
  getBoardWithId(@Param('id', ParseIntPipe) id: number): Promise<Board> {
    this.logger.log(`GET: ${id} get with id`);
    return this.boardService.getOne(id);
  }

  /**
   * @todo page와 size를 받아서 page에 맞는 size만큼의 Board를 리턴한다.
   * @param page
   * @returns
   */
  @Get()
  @ApiOperation({ summary: 'page의 size만큼의 Board를 요청합니다.' })
  @ApiResponse({
    status: 200,
    type: BoardDto,
    description: 'size와 page에 맞는 Board들을 요청합니다.',
  })
  @ApiParam({
    name: 'page',
    type: 'number',
    required: false,
    example: 1,
    description: '받고 싶은 Boards의 페이지',
  })
  @ApiParam({
    name: 'size',
    type: 'number',
    required: false,
    example: 10,
    description: '한 페이지 당 Board의 개수',
  })
  getAllBoards(): Promise<Board[]> {
    return this.boardService.getAll();
  }

  @Post()
  @ApiOperation({ summary: '새로운 Board를 생성합니다.' })
  @ApiParam({
    name: 'BoardDto',
    type: BoardDto,
    required: true,
    description: '생성할 Board의 정보',
  })
  @ApiResponse({
    status: 200,
    type: BoardDto,
    description: '생성한 Board를 리턴합니다.',
  })
  @ApiResponse({
    status: 400,
    description: 'category name이 잘못되었습니다.',
  })
  @UseGuards(AuthGuard())
  createOne(@Body() boardDto: BoardDto, @GetUser() user: User): Promise<Board> {
    this.logger.log(
      'POST 생성' +
        `title: ${boardDto.title} ` +
        `content: ${boardDto.content}`,
    );
    return this.boardService.create(boardDto, user);
  }

  @Put(':id')
  @ApiOperation({ summary: 'id에 해당하는 Board를 수정합니다.' })
  @ApiParam({
    name: 'id',
    type: 'number',
    required: true,
    example: 1,
    description: '수정하고 싶은 Board의 id',
  })
  @ApiResponse({
    status: 200,
    type: BoardDto,
    description: '수정한 Board를 리턴합니다.',
  })
  @ApiResponse({
    status: 400,
    description: 'category name이 잘못되었습니다.',
  })
  @UseGuards(AuthGuard())
  updateOne(
    @Param('id', ParseIntPipe) id: number,
    @Body() BoardDto: BoardDto,
    @GetUser() user: User,
  ): Promise<Board> {
    return this.boardService.update(id, BoardDto, user);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'id에 해당하는 Board를 삭제합니다.' })
  @ApiParam({
    name: 'id',
    type: 'number',
    required: true,
    example: 1,
    description: '삭제하고 싶은 Board의 id',
  })
  @UseGuards(AuthGuard())
  deleteOne(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): void {
    this.logger.log(`Delete 삭제 id: ${id}`);
    this.boardService.delete(id, user);
  }
}
