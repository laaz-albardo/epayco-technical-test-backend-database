import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { useContainer } from 'class-validator';
import { Logger, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClassValidatorConfig, IJwt, IServer } from './config';
import cookieParser from 'cookie-parser';
import fastifyCookie from '@fastify/cookie';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  // Config Service
  const { name, host, port } = app
    .get<ConfigService>(ConfigService)
    .get<IServer>('server');

  const { secret } = app.get<ConfigService>(ConfigService).get<IJwt>('jwt');

  // Global prefix
  app.setGlobalPrefix('api');

  // Cors
  app.enableCors({
    origin: '*',
    credentials: true,
  });

  // fastify cookies
  app.use(cookieParser());
  await app.register(fastifyCookie, {
    parseOptions: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
    },
    secret: secret,
  });

  app.enableVersioning({
    type: VersioningType.URI,
  });

  // use validators containers
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  // Validations
  app.useGlobalPipes(ClassValidatorConfig);

  await app.listen(port, () => {
    Logger.log(`Welcome to ${name}, Server run on ${host}:${port}/api`);
  });
}
bootstrap();
