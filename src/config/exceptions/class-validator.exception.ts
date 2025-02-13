import {
  HttpStatus,
  UnprocessableEntityException,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';

export const ClassValidatorConfig = new ValidationPipe({
  whitelist: true,
  errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
  validationError: {
    target: false,
  },
  exceptionFactory: ClassValidatorExceptions,
});

export function ClassValidatorExceptions(errors: ValidationError[]) {
  const e = errors.map((error) => {
    const tmp = {};
    tmp[error.property] = [];
    const keys = Object.keys(error.constraints);
    keys.forEach((key) => {
      tmp[error.property].push(error.constraints[key]);
    });
    return tmp;
  });

  return new UnprocessableEntityException(e);
}
