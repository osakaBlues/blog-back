import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { BoardRepository } from './board.repository';
import { BoardDto } from 'src/dto/Board.dto';
import { Board } from './board.entity';
import { User } from 'src/auth/user.entity';
import { CategoryRepository } from 'src/category/category.repository';
import { Category } from 'src/category/category.entity';

@Injectable()
export class BoardService {
  constructor(
    private readonly boardRepository: BoardRepository,
    private readonly categoryRepository: CategoryRepository,
  ) {}
  private readonly logger = new Logger(BoardService.name);

  /**
   * BoardDto와 user를 받아서 새로운 Board를 만들고 저장한다.
   * date는 해당 서비스를 호출한 시간을 기준으로 작성된다.
   * @throws {BadRequestException} category가 없을 때
   * @param BoardDto
   * @param User
   * @returns Promise<Board>
   */
  async create(boardDto: BoardDto, user: User): Promise<Board> {
    this.logger.log(`create ${boardDto.title}`);
    const date = Date.now();
    const { title, content } = boardDto;
    let category: Category;
    try {
      category = await this.categoryRepository.findOneByOrFail({
        name: boardDto.category,
      });
    } catch (err) {
      this.logger.log('category not found');
      throw new BadRequestException();
    }
    const ret = this.boardRepository.create({
      title,
      content,
      user,
      date: date,
      category: category,
    });
    return await this.boardRepository.save(ret);
  }

  /**
   * id를 이용해서 Board를 삭제합니다.
   * @throws {NotFoundException} id에 맞는 Board가 없을 때
   * @throws {UnauthorizedException} user가 만든 Board가 아닐 때
   * @param {number} id
   * @param {User} user
   * @returns void
   */
  async delete(id: number, user: User): Promise<void> {
    this.logger.log(`delete ${id}`);
    let board: Board;
    try {
      board = await this.boardRepository.findOneByOrFail({ id });
    } catch (e) {
      this.logger.log('board not found');
      throw new NotFoundException();
    }
    if (board.user.id !== user.id) {
      this.logger.log('user not match');
      throw new UnauthorizedException();
    }
    await this.boardRepository.remove(board);
  }

  /**
   * update
   * @param id
   * @param BoardDto
   * @returns Promise<Board>
   */
  update(id: number, BoardDto: BoardDto): Promise<Board> {
    this.logger.log(`update ${id}`);
    return null;
  }

  /**
   * getOne
   * @param id
   * @returns Promise<Board>
   */
  getOne(id: number): Promise<Board> {
    this.logger.log(`getOne ${id}`);
    return null;
  }

  /**
   * getAll
   * @returns Promise<Board[]>
   */
  getAll(): Promise<Board[]> {
    this.logger.log(`getAll`);
    return null;
  }
}
