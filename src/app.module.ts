import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configLoader, envConfigSchema, MongooseConfig } from './config';
import {
  AuthModule,
  MailModule,
  OrderModule,
  UserModule,
  WalletModule,
} from './modules';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [configLoader],
      validationSchema: envConfigSchema,
    }),
    EventEmitterModule.forRoot({ global: true }),
    MongooseConfig,
    UserModule,
    AuthModule,
    WalletModule,
    MailModule,
    OrderModule,
  ],
})
export class AppModule {}
