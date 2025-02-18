import { UseGuards, applyDecorators } from '@nestjs/common';
import { JwtAuthGuard } from '../guards';

/**
 * Decorador que permite verificar la autenticacion para todos los roles
 *
 * @constructor
 */
export function AuthAll() {
  return applyDecorators(UseGuards(JwtAuthGuard));
}
