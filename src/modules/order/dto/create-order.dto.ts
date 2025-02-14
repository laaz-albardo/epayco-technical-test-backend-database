import { IsNotEmpty, IsNumber } from 'class-validator';
import { IOrder } from '../interfaces';

export class CreateOrderDto implements Partial<IOrder> {
  @IsNotEmpty()
  @IsNumber()
  total: number;
}
