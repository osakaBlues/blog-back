import { Injectable } from '@nestjs/common';
import { Memo } from './memo.entity';
import MemoDto from './memo.dto';
import { MemoRepository } from './memo.repository';

@Injectable()
export class MemoService {
  constructor(private memoRepository: MemoRepository) {}
  async getAll(): Promise<Memo[]> {
    return await this.memoRepository.find();
  }

  async getOne(id: number): Promise<Memo> {
    return await this.memoRepository.findOne({
      where: { id },
    });
  }

  async create(dto: MemoDto): Promise<Memo> {
    const memo = this.memoRepository.create({
      title: dto.title,
      content: dto.content,
    });
    await this.memoRepository.save(memo);
    return memo;
  }
}
