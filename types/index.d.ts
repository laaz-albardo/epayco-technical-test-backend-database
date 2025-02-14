//NodeJS.ProcessEnv

declare namespace NodeJS {
  interface ProcessEnv {
    PRODUCT_NAME: string;
    NODE_ENV: string;
    SERVER_HOST: string;
    SERVER_PORT: number;
    MONGODB_HOST: string;
    MONGODB_PORT: number;
    MONGODB_DBNAME: string;
    MONGODB_DBTEST: string;
    MONGODB_USER: string;
    MONGODB_PASSWORD: string;
    JWT_SECRET: string;
    JWT_EXPIRES: number;
    SMTP_HOST: string;
    SMTP_PORT: number;
    SMTP_USERNAME: string;
    SMTP_PASSWORD: string;
    SMTP_SECURE_SSL: boolean;
    SMTP_SENDER_NAME: string;
    SMTP_SENDER_EMAIL_DEFAULT: string;
  }
}
