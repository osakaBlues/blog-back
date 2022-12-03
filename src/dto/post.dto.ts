import { ApiProperty } from "@nestjs/swagger";

export class PostDto {
  constructor({author, title, content, date}) {
    this.author = author;
    this.title = title;
    this.content = content;
    this.date = date;
  }
  @ApiProperty({
    description: '작성자',
    example: 'test_author'
  })
  author: String
  @ApiProperty({
    description: '글 카테고리',
    example: '기본'
  })
  category: String
  @ApiProperty({
    description: '글 제목',
    example: 'my test title'
  })
  title: String
  @ApiProperty({
      description: '글 본문',
      example: '적당히 테스트 하기 좋은 글의 내용들이 적혀있어요\n대충 두줄 이상입니다.'
  })
  content: String
  @ApiProperty({
    description: '글이 최종적으로 수정된 날짜',
    example: '2022-12-03T15:13:10.890Z'
  })
  date: Date

}
