import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { useContainer } from 'class-validator';
import { Logger, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClassValidatorConfig, IServer } from './config';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  // Config Service
  const { name, host, port } = app
    .get<ConfigService>(ConfigService)
    .get<IServer>('server');

  // Global prefix
  app.setGlobalPrefix('api');

  // Cors
  app.enableCors({
    origin: '*',
    credentials: true,
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
