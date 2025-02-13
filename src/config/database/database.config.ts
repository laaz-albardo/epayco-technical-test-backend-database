import { DynamicModule } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { matches } from 'class-validator';
import { IDatabase } from '../enviroment';

const dbHost = ({ url, host, port }: Partial<IDatabase>) => {
  const urlDB = matches(url, /^(mongodb:\/\/|mongodb\+srv:\/\/)/)
    ? url
    : `mongodb://${host}:${port}`;

  return urlDB;
};

export const MongooseConfig: DynamicModule = MongooseModule.forRootAsync({
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    const { host, port, url, database, username, password } =
      configService.get<IDatabase>('db');

    return {
      uri: dbHost({ host, port, url }),
      dbName: database,
      user: username,
      pass: password,
    };
  },
});
