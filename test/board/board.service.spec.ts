import { Test, TestingModule } from '@nestjs/testing';
import { User } from 'src/auth/user.entity';
import { Board } from 'src/board/board.entity';
import { BoardRepository } from 'src/board/board.repository';
import { BoardService } from 'src/board/board.service';
import { Category } from 'src/category/category.entity';
import { CategoryRepository } from 'src/category/category.repository';
import { BoardDto } from 'src/dto/Board.dto';

const MOCK_BOARD_DTO = {
  title: 'test',
  content: 'test',
  category: 'test_category',
};
const MOCK_USER = {
  id: 1,
  name: 'test',
  password: '1234',
  board: null,
};
const MOCK_BOARD = {
  ...MOCK_BOARD_DTO,
  id: 1,
  user: MOCK_USER,
  date: new Date(),
};

const MOCK_CATEGORY = {
  id: 231,
  name: 'test_category',
  board: [],
};

describe('service test', () => {
  let boardService: BoardService;
  const mockBoardRepository = {
    save: jest.fn().mockResolvedValue(MOCK_BOARD),
    create: jest.fn().mockReturnValue(MOCK_BOARD),
    findByOne: jest.fn(),
    remove: jest.fn(),
  };

  const mockCategoryRepository = {
    findOneByOrFail: jest.fn().mockResolvedValue(MOCK_CATEGORY),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BoardService, BoardRepository, CategoryRepository],
    })
      .overrideProvider(BoardRepository)
      .useValue(mockBoardRepository)
      .overrideProvider(CategoryRepository)
      .useValue(mockCategoryRepository)
      .compile();
    boardService = module.get<BoardService>(BoardService);
  });

  it('just test', async () => {
    await expect(
      boardService.create(MOCK_BOARD_DTO, MOCK_USER),
    ).resolves.toEqual(MOCK_BOARD);
    expect(mockBoardRepository.create).toBeCalled();
    expect(mockBoardRepository.save).toHaveBeenCalled();
  });
});
