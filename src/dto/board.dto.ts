import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate } from 'class-validator';

export interface BoardDtoOptions {
  title?: string;
  content?: string;
  category?: string;
  date?: Date;
}

/**
 * BoardDto
 * @param title 글 제목
 * @param content 글 본문
 * @param category 카테고리
 * @param date 날짜
 */
export class BoardDto {
  constructor(options?: BoardDtoOptions) {
    this.title = options.title;
    this.content = options.content;
    this.category = options.category;
    this.date = options.date;
  }
  @ApiProperty({
    description: '글 카테고리',
    example: '기본',
  })
  category: string;
  @ApiProperty({
    description: '글 제목',
    example: 'my test title',
  })
  title: string;
  @ApiProperty({
    description: '글 본문',
    example:
      '적당히 테스트 하기 좋은 글의 내용들이 적혀있어요\n대충 두줄 이상입니다.',
  })
  content: string;

  @ApiProperty({
    description: '날짜',
    example: '2022-12-23T14:09:40.415Z',
  })
  @Type(() => Date)
  @IsDate()
  date: Date;
}
