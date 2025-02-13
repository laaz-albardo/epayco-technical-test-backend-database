import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { IJwt } from '@src/config';
import { JwtStrategy, LocalStrategy } from './strategies';
import { UserModule } from '../user';
import { AuthUserUseCase, LoginUseCase } from './useCases';

@Module({
  imports: [
    forwardRef(() => UserModule),
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const { secret, expiresIn } = config.get<IJwt>('jwt');

        return {
          secret: secret,
          signOptions: { expiresIn: `${expiresIn}s` },
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    AuthUserUseCase,
    LoginUseCase,
  ],
})
export class AuthModule {}
