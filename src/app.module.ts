import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configLoader, envConfigSchema } from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [configLoader],
      validationSchema: envConfigSchema,
    }),
  ],
})
export class AppModule {}
