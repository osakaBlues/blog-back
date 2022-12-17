import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { Memo } from './memo.entity';
import MemoDto from './memo.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';

@Injectable()
export class MemoService {
  private readonly log: Logger;
  constructor(
    @InjectRepository(Memo)
    private readonly memoRepository: Repository<Memo>,
  ) {
    this.log = new Logger(MemoService.name);
  }
  async getAll(): Promise<Memo[]> {
    return await this.memoRepository.find();
  }

  async getOne(id: number): Promise<Memo> {
    return await this.memoRepository.findOneBy({ id });
  }

  async create(dto: MemoDto, user: User): Promise<Memo> {
    const memo = this.memoRepository.create({
      ...dto,
      user,
    });
    await this.memoRepository.save(memo);
    return memo;
  }

  async delete(id: number, user: User): Promise<void> {
    const memo = await this.memoRepository.findOneBy({ id });
    if (memo.user.id === user.id) {
      memo.remove();
    } else {
      throw new UnauthorizedException('user has not authority');
    }
  }
}
