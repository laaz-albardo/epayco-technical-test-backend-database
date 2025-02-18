import { IConfiguration } from './configuration.interface';

export const configLoader = (): IConfiguration => {
  return {
    server: {
      name: process.env.PRODUCT_NAME,
      environment: process.env.NODE_ENV,
      host: process.env.SERVER_HOST,
      port: Number(process.env.SERVER_PORT),
      webHost: process.env.WEB_SERVER_HOST,
      webPort: Number(process.env.WEB_SERVER_PORT),
    },
    db: {
      host: process.env.MONGODB_HOST,
      port: Number(process.env.MONGODB_PORT),
      url: process.env.MONGODB_URL,
      database: process.env.MONGODB_DBNAME,
      username: process.env.MONGODB_USER,
      password: process.env.MONGODB_PASSWORD,
    },
    jwt: {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.JWT_EXPIRES,
    },
    smtp: {
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      username: process.env.SMTP_USERNAME,
      password: process.env.SMTP_PASSWORD,
      secureSsl: process.env.SMTP_SECURE_SSL,
      senderName: process.env.SMTP_SENDER_NAME,
      senderEmailDefault: process.env.SMTP_SENDER_EMAIL_DEFAULT,
    },
  };
};
