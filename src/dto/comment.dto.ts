import { ApiProperty } from '@nestjs/swagger';

export class CommentDto {
  @ApiProperty({
    description: '댓글 작성자',
    example: 'test_author',
  })
  author: string;
}
