import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDto } from './create-order.dto';
import { IsNotEmpty, IsObject } from 'class-validator';
import { IUser } from '@src/modules/user';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
  @IsNotEmpty()
  @IsObject()
  user: IUser;
}
