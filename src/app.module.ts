import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configLoader, envConfigSchema, MongooseConfig } from './config';
import { AuthModule, UserModule, WalletModule } from './modules';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [configLoader],
      validationSchema: envConfigSchema,
    }),
    MongooseConfig,
    UserModule,
    AuthModule,
    WalletModule,
  ],
})
export class AppModule {}
