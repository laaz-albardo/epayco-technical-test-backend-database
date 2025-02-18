import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserTransformer } from '@src/modules/user';
import { FastifyReply } from 'fastify';

@Injectable()
export class AuthInterceptor<T>
  implements NestInterceptor<T, Promise<FastifyReply<any>>>
{
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const res = context.switchToHttp().getResponse<FastifyReply>();
    return next.handle().pipe(
      map(async (data) => {
        return {
          statusCode: res.statusCode,
          msg: 'Authenticated',
          data: UserTransformer.transform(data),
          errors: null,
        };
      }),
    );
  }
}
