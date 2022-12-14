import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Memo } from './memo.entity';

@Injectable()
export class MemoRepository extends Repository<Memo> {
  constructor(private dataSource: DataSource) {
    super(Memo, dataSource.createEntityManager());
  }
}
