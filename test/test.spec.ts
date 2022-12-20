test('test.spec for test', () => {
  expect(1 + 1).toBe(2);
  expect(1 + 1).not.toBe(1);
});

// test('test for database conneciton', async () => {
//   const AppDataSource = new DataSource({
//     type: process.env.DATABASE_TYPE as MysqlConnectionOptions['type'],
//     host: process.env.DATABASE_HOST,
//     port: parseInt(process.env.DATABASE_PORT, 10),
//     username: process.env.DATABASE_USER_NAME,
//     password: process.env.DATABASE_PASSWORD,
//     database: process.env.DATABASE_DATABASE_NAME,
//   });
//   await expect(
//     AppDataSource.initialize().then(() => AppDataSource.destroy()),
//   ).resolves.not.toThrow();
// });
/**
describe('repository test', () => {
  let module: TestingModule;
  let app: INestApplication;
  let memoRepository: Repository<Memo>;
  let userRepository: Repository<User>;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        MemoModule,
        AuthModule,
        TypeOrmModule.forRoot({
          type: process.env.DATABASE_TYPE as MysqlConnectionOptions['type'],
          host: process.env.DATABASE_HOST,
          port: parseInt(process.env.DATABASE_PORT, 10),
          username: process.env.DATABASE_USER_NAME,
          password: process.env.DATABASE_PASSWORD,
          database: process.env.DATABASE_DATABASE_NAME,
          entities: [Memo, User],
          synchronize: false,
        }),
      ],
    }).compile();

    app = module.createNestApplication();
    memoRepository = module.get<Repository<Memo>>('MemoRepository');
    userRepository = module.get<Repository<User>>('UserRepository');
    await memoRepository.manager.connection.synchronize(true);
    await userRepository.manager.connection.synchronize(true);
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  afterEach(async () => {
    await memoRepository.query('SET FOREIGN_KEY_CHECKS = 0');
    await memoRepository.clear();
    await memoRepository.query('SET FOREIGN_KEY_CHECKS = 1');
    await userRepository.query('SET FOREIGN_KEY_CHECKS = 0');
    await userRepository.clear();
    await userRepository.query('SET FOREIGN_KEY_CHECKS = 1');
  });

  test('insert one and find', async () => {
    const prefix = 'test_';
    const userName = 'user';
    const password = 'password';
    const title = 'title';
    const content = 'content';

    const user = await userRepository.save(
      userRepository.create({
        name: prefix + userName,
        password: prefix + password,
      }),
    );

    const memo = await memoRepository.save(
      memoRepository.create({
        title: prefix + title,
        content: prefix + content,
        user,
      }),
    );

    const savedMemo = await memoRepository.findOneBy({ id: memo.id });
    expect(savedMemo.id).toEqual(memo.id);
  });

  test('simple find', async () => {
    await expect(memoRepository.find()).resolves.toEqual([]);
    await expect(userRepository.find()).resolves.toEqual([]);
  });
});
**/
