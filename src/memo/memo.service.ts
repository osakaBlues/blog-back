import { Injectable } from '@nestjs/common';
import { Memo } from './memo.entity';
import MemoDto from './memo.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MemoService {
  constructor(
    @InjectRepository(Memo)
    private readonly memoRepository: Repository<Memo>,
  ) {}
  async getAll(): Promise<Memo[]> {
    return await this.memoRepository.find();
  }

  async getOne(id: number): Promise<Memo> {
    return await this.memoRepository.findOneBy({ id });
  }

  async create(dto: MemoDto): Promise<Memo> {
    const memo = this.memoRepository.create({
      ...dto,
    });
    await this.memoRepository.save(memo);
    return memo;
  }
}
