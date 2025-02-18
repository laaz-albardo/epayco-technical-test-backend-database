import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FastifyReply } from 'fastify';

@Injectable()
export class LogoutInterceptor<T>
  implements NestInterceptor<T, Promise<FastifyReply<any>>>
{
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const res = context.switchToHttp().getResponse<FastifyReply>();
    return next.handle().pipe(
      map(async () => ({
        statusCode: res.statusCode,
        msg: 'Session end',
        data: null as any,
        errors: null,
      })),
    );
  }
}
