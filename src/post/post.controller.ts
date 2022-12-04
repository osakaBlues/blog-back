import {
  Controller,
  Delete,
  Get,
  HttpStatus,
  Logger,
  Param,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PostDto } from 'src/dto/post.dto';
import { PostService } from './post.service';
import { Response } from 'express';
import { Body } from '@nestjs/common/decorators';
import { BLOG_VERSION } from 'src/config';

/**
 * 블로그 글과 관련된 요청들을 받는 Controller
 * @decorator `@Controller`
 */
@ApiTags('post와 관련된 request를 처리한다.')
@Controller({
  version: BLOG_VERSION,
  path: 'posts',
})
export class PostController {
  private readonly logger = new Logger(PostController.name);
  constructor(private readonly postService: PostService) {}
  /**
   * id에 맞는 post하나를 찾아서 리턴한다.
   * @param {String} id 찾을 post의 id
   * @todo
   */
  @Get('/:id')
  @ApiOperation({ summary: 'id에 맞는 post를 찾아서 리턴한다.' })
  @ApiResponse({
    status: 200,
    description: '해당 id의 포스트를 요청합니다.',
    type: String,
  })
  @ApiResponse({ status: 400, description: 'id가 숫자가 아닙니다.' })
  getPostWithId(@Param('id') id: number, @Res() res: Response) {
    this.logger.log(`id가 ${id}인 post를 요청합니다.`);
    if (isNaN(id)) {
      this.logger.log(`${id}는 숫자가 아닙니다.`);
      res.status(HttpStatus.BAD_REQUEST).send();
    }
    res.status(HttpStatus.OK).json(
      new PostDto({
        author: 'test',
        title: 'test',
        content: 'test',
        date: new Date(),
      }),
    );
  }

  /**
   *
   * @param page
   * @returns
   */
  @Get()
  @ApiOperation({ summary: 'page의 size만큼의 post를 요청합니다.' })
  @ApiResponse({
    status: 200,
    type: PostDto,
    description: 'size와 page에 맞는 post들을 요청합니다.',
  })
  @ApiParam({
    name: 'page',
    type: 'number',
    required: false,
    example: 1,
    description: '받고 싶은 posts의 페이지',
  })
  @ApiParam({
    name: 'size',
    type: 'number',
    required: false,
    example: 10,
    description: '한 페이지 당 post의 개수',
  })
  getAllPosts(
    @Query('page') page: number,
    @Query('size') size: number,
    @Res() res: Response,
  ) {
    this.logger.log(`page: ${page} size: ${size} post들를 요청합니다.`);
    res.status(HttpStatus.OK).send();
  }

  @Post()
  @ApiOperation({ summary: '새로운 post를 생성합니다.' })
  @ApiParam({
    name: 'postDto',
    type: PostDto,
    required: true,
    description: '생성할 post의 정보',
  })
  createOne(@Body() postDto: PostDto, @Res() res: Response) {
    this.logger.log(`새로운 post를 생성합니다.`);
    this.logger.log(postDto);
    res.status(HttpStatus.CREATED).send();
  }

  @Put(':id')
  @ApiOperation({ summary: 'id에 해당하는 post를 수정합니다.' })
  @ApiParam({
    name: 'id',
    type: 'number',
    required: true,
    example: 1,
    description: '수정하고 싶은 post의 id',
  })
  updateOne(@Param('id') id: number): string {
    this.logger.log(`id가 ${id}인 post를 수정합니다.`);
    return null;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'id에 해당하는 post를 삭제합니다.' })
  @ApiParam({
    name: 'id',
    type: 'number',
    required: true,
    example: 1,
    description: '삭제하고 싶은 post의 id',
  })
  deleteOne(@Param('id') id: number): string {
    this.logger.log(`id가 ${id}인 post를 삭제합니다.`);
    return null;
  }
}
