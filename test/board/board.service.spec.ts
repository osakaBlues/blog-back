import {
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from 'src/auth/user.entity';
import { Board } from 'src/board/board.entity';
import { BoardRepository } from 'src/board/board.repository';
import { BoardService } from 'src/board/board.service';
import { Category } from 'src/category/category.entity';
import { CategoryRepository } from 'src/category/category.repository';
import { BoardDto } from 'src/dto/Board.dto';

const MOCK_BOARD_DTO: BoardDto = {
  title: 'test_title',
  content: 'test_content',
  category: 'test_category',
  date: new Date('2022-12-23T14:09:40.415Z'),
};

const MOCK_UPDATE_BOARD_DTO: BoardDto = {
  title: 'update_test',
  content: 'update_test',
  category: 'test_category',
  date: new Date('2022-12-23T14:09:40.415Z'),
};

const MOCK_WRONG_CATE_DTO: BoardDto = {
  title: 'a',
  content: 'b',
  category: 'fail',
  date: new Date('2022-12-23T14:09:40.415Z'),
};

const MOCK_CATEGORY: Category = {
  id: 1,
  name: 'test_category',
  board: [],
};

const MOCK_USER_ID1: User = {
  id: 1,
  name: 'id1',
  password: '1234',
  board: null,
};

const MOCK_USER_ID2: User = {
  id: 2,
  name: 'id',
  password: '1234',
  board: null,
};

const MOCK_BOARD_ID1: Board = {
  ...MOCK_BOARD_DTO,
  category: null,
  id: 1,
  user: MOCK_USER_ID1,
  date: new Date('2022-12-23T14:09:40.415Z'),
  updated_date: new Date(),
};

const MOCK_BOARD_ID2: Board = {
  ...MOCK_BOARD_DTO,
  category: null,
  id: 2,
  user: MOCK_USER_ID2,
  date: new Date('2022-12-23T14:09:40.415Z'),
  updated_date: new Date(),
};

const MOCK_SAVED_BOARD: Board = {
  ...MOCK_BOARD_DTO,
  category: null,
  id: 3,
  user: MOCK_USER_ID1,
  date: new Date('2022-12-23T14:09:40.415Z'),
  updated_date: new Date(),
};

const MOCK_UPDATE_BOARD: Board = {
  ...MOCK_BOARD_ID1,
  ...MOCK_UPDATE_BOARD_DTO,
  category: MOCK_CATEGORY,
};

describe('board service test', () => {
  let boardService: BoardService;

  /* mock board repository */
  const mockBoardRepository = {
    save: jest.fn().mockResolvedValue(MOCK_SAVED_BOARD),
    create: jest.fn().mockReturnValue(MOCK_SAVED_BOARD),
    findOneByOrFail: jest.fn(({ id }) => {
      if (id === 1) {
        return Promise.resolve(MOCK_BOARD_ID1);
      } else if (id === 2) {
        return Promise.resolve(MOCK_BOARD_ID2);
      } else {
        throw new Error('findOneByOrFail in board: fail');
      }
    }),
    remove: jest.fn().mockResolvedValue(Promise<void>),
    find: jest
      .fn()
      .mockResolvedValue(new Array([MOCK_BOARD_ID1, MOCK_BOARD_ID2])),
    update: jest.fn().mockResolvedValue(MOCK_UPDATE_BOARD),
  };

  /* mock category repository */
  const mockCategoryRepository = {
    findOneByOrFail: jest.fn(({ name }) => {
      if (name === 'fail') throw new Error('findOneByOrFail in category: fail');
      else return Promise.resolve(MOCK_CATEGORY);
    }),
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

  /* test create */
  it('simple create test', async () => {
    await expect(
      boardService.create(MOCK_BOARD_DTO, MOCK_USER_ID1),
    ).resolves.toEqual(MOCK_SAVED_BOARD);
    expect(mockBoardRepository.create).toBeCalled();
    expect(mockBoardRepository.save).toHaveBeenCalled();
  });

  it('wrong category test', async () => {
    await expect(
      boardService.create(MOCK_WRONG_CATE_DTO, MOCK_USER_ID1),
    ).rejects.toThrow(BadRequestException);
    expect(mockCategoryRepository.findOneByOrFail).toBeCalled();
  });

  /* test delete */
  it('simple delete test', async () => {
    await expect(
      boardService.delete(1, MOCK_USER_ID1),
    ).resolves.toBeUndefined();
    expect(mockCategoryRepository.findOneByOrFail).toBeCalled();
  });

  it('delete board does not exist test', async () => {
    await expect(boardService.delete(3, MOCK_USER_ID1)).rejects.toThrow(
      NotFoundException,
    );
    expect(mockBoardRepository.findOneByOrFail).toBeCalled();
  });

  it('delete board not matched user id', async () => {
    await expect(boardService.delete(2, MOCK_USER_ID1)).rejects.toThrow(
      UnauthorizedException,
    );
    expect(mockBoardRepository.findOneByOrFail).toBeCalled();
  });

  /* test getOne */
  it('simple getOne test', async () => {
    await expect(boardService.getOne(1)).resolves.toStrictEqual(MOCK_BOARD_ID1);
    await expect(boardService.getOne(2)).resolves.toStrictEqual(MOCK_BOARD_ID2);
    expect(mockBoardRepository.findOneByOrFail).toBeCalled();
  });

  it('find board by id does not exist test', async () => {
    await expect(boardService.getOne(3)).rejects.toThrow(NotFoundException);
    expect(mockBoardRepository.findOneByOrFail).toBeCalled();
  });

  /* test getAll */
  it('getAll test', async () => {
    await expect(boardService.getAll()).resolves.toBeInstanceOf(Array);
    expect(mockBoardRepository.find).toBeCalled();
  });

  /* test update */
  it('board update test', async () => {
    await expect(
      boardService.update(1, MOCK_UPDATE_BOARD_DTO, MOCK_USER_ID1),
    ).resolves.toStrictEqual(MOCK_UPDATE_BOARD);
  });

  it('can not find board with id', async () => {
    await expect(
      boardService.update(10, MOCK_UPDATE_BOARD_DTO, MOCK_USER_ID1),
    ).rejects.toThrow(NotFoundException);
  });

  it('can not find category with name', async () => {
    await expect(
      boardService.update(1, MOCK_WRONG_CATE_DTO, MOCK_USER_ID1),
    ).rejects.toThrow(BadRequestException);
  });

  it('try to update board from user without permission', async () => {
    await expect(
      boardService.update(1, MOCK_UPDATE_BOARD_DTO, MOCK_USER_ID2),
    ).rejects.toThrow(UnauthorizedException);
  });
});
