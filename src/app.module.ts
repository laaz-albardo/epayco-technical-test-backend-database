import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configLoader, envConfigSchema, MongooseConfig } from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [configLoader],
      validationSchema: envConfigSchema,
    }),
    MongooseConfig,
  ],
})
export class AppModule {}
