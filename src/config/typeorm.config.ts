import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeORMConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'user',
  password: 'test',
  database: 'testing',
  entities: [__dirname + '../**/*.entity.{js,ts}'],
};
