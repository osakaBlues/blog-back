import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import type { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

dotenv.config();

test('test.spec for test', () => {
  expect(1 + 1).toBe(2);
  expect(1 + 1).not.toBe(1);
});

test('test for database conneciton', async () => {
  const AppDataSource = new DataSource({
    type: process.env.DATABASE_TYPE as MysqlConnectionOptions['type'],
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10),
    username: process.env.DATABASE_USER_NAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DATABASE_NAME,
  });
  await expect(
    AppDataSource.initialize().then(() => AppDataSource.destroy()),
  ).resolves.not.toThrow();
});
