# osaka api

## 배워야 하는 것들

1. [Type ORM](https://typeorm.io/)
2. [Nestjs](https://docs.nestjs.com/)
3. [Swagger](https://docs.nestjs.com/openapi/introduction)
4. [Passport](https://www.passportjs.org/concepts/authentication/oauth/)
5. [JSDoc](https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html)
6. [jest](https://jestjs.io/docs/getting-started)
7. [ESLint](https://eslint.org/docs/latest/)
8. [Prettier](https://prettier.io/docs/en/index.html)
9. [Typescript](https://www.typescriptlang.org/docs/)
10. [REST API](https://restfulapi.net/)

## 필요한 것들

1. admin login (url 접근만 허용)
2. 게시글
3. 댓글, 대댓글 (닉네임이랑 비밀번호만 적어서 입력, 수정, 삭제 가능하도록)

### 세부 api

pagination 구현은 하는걸로

- `/api/v1` 으로 시작
- `/적당히_어려운_조합/login` login (id, pw 로 로그인)
	post -> login
- `/posts?`
	querystr: category, page
	get -> total posts (paging 필요하면 query string)
	post -> create
	- `/posts/{id}`
		get -> read a post
		update -> update
		delete -> 삭제
-  `/comments`
	querystr: post_id
	get -> query string에 맞는 정보
	post -> post_id를 포함한 상태
	- `/comments/{id}`
		get -> read a comments
		update -> update
		delete -> delete

### DB model

## 미래에 구현할까?

1. 트위터 로그인  같은 소셜 로그인 기능?

## 데이터베이스

MariaDB
