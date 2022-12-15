import * as dotenv from 'dotenv';

dotenv.config();

interface databaseNames {
  TYPE:
    | 'mysql'
    | 'postgres'
    | 'mariadb'
    | 'sqlite'
    | 'mssql'
    | 'oracle'
    | 'mongodb';
}

const config = {
  DATABASE: {
    TYPE: process.env.DATABASE_TYPE as databaseNames['TYPE'],
    HOST: process.env.DATABASE_HOST,
    PORT: parseInt(process.env.DATABASE_PORT) || 3306,
    USER_NAME: process.env.DATABASE_USER_NAME,
    PASSWORD: process.env.DATABASE_PASSWORD,
    DATABASE_NAME: process.env.DATABASE_DATABASE_NAME,
  },
  BLOG: {
    URL_PRIFIX: process.env.BLOG_URL_PRIFIX,
    PORT: parseInt(process.env.BLOG_PORT) || 3000,
    VERSION: process.env.BLOG_VERSION,
    TITLE: process.env.BLOG_TITLE,
    DOCS_URL: process.env.BLOG_DOCS_URL,
  },
};

export default config;
