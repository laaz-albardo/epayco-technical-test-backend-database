import { IsMongoId, IsNotEmpty, IsNumber } from 'class-validator';
import { IOrder } from '../interfaces';
import { IUser } from '@src/modules/user';

export class CreateOrderDto implements IOrder {
  @IsNotEmpty()
  @IsNumber()
  total: number;

  @IsNotEmpty()
  @IsMongoId()
  user: IUser;
}
