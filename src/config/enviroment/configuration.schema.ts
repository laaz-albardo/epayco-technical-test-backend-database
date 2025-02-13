import Joi from 'joi';

export const envConfigSchema = Joi.object({
  PRODUCT_NAME: Joi.string().default('NestJS API DB'),
  NODE_ENV: Joi.string()
    .valid('development', 'production')
    .default('development'),
  SERVER_HOST: Joi.string().default('http://127.0.0.1'),
  SERVER_PORT: Joi.string().default(3000),
  MONGODB_HOST: Joi.string().default('localhost'),
  MONGODB_PORT: Joi.string().default(27017),
  MONGODB_URL: Joi.string().required(),
  MONGODB_DBNAME: Joi.string().required(),
  MONGODB_USER: Joi.string().required(),
  MONGODB_PASSWORD: Joi.string().required(),
  JWT_SECRET: Joi.string().default('MySecretkey'),
  JWT_EXPIRES: Joi.string().default(43200),
});
