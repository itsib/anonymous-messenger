import * as dotenv from 'dotenv';
import * as mongodbUri from 'mongodb-uri';

dotenv.config();

const config = Object.freeze({
  port: process.env.PORT || 4444,
  nodeEnv: process.env.NODE_ENV || 'development',
  frontUrl: process.env.FRONT_URL || 'http://localhost:4445',
  secret: process.env.SECRET || 'server_secret',
  reCaptchaSecret: process.env.RE_CAPTCHA_SECRET,
  dbUrl: mongodbUri.format({
    scheme: 'mongodb',
    username: process.env.DB_USER || 'chat',
    password: process.env.DB_PASS || '',
    database: process.env.DB,
    hosts: [
      {
        host: process.env.DB_HOST || 'localhost',
        port: Number(process.env.DB_PORT || '27017'),
      },
    ],
  }),
});

export { config };
