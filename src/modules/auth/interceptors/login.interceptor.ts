import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthTransformer } from '../transformers';
import { FastifyReply } from 'fastify';
import { ConfigService } from '@nestjs/config';
import { IJwt } from '@src/config';

@Injectable()
export class LoginInterceptor<T>
  implements NestInterceptor<T, Promise<FastifyReply<any>>>
{
  constructor(private readonly config: ConfigService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const res = context.switchToHttp().getResponse<FastifyReply>();

    const { expiresIn } = this.config.get<IJwt>('jwt');

    const expires = new Date(Date.now() + Number(expiresIn * 1000));

    return next.handle().pipe(
      map(
        async (data) => (
          res.setCookie('token', data.hash, {
            expires,
          }),
          {
            statusCode: res.statusCode,
            msg: 'Session started',
            data: AuthTransformer.transform(data),
            errors: null,
          }
        ),
      ),
    );
  }
}
