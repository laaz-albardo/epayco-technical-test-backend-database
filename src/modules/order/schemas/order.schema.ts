import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IOrder } from '../interfaces';
import { IUser, UserSchema } from '@src/modules/user';

@Schema({ timestamps: true })
export class Order implements IOrder {
  @Prop({ type: String, required: false })
  sesionId: string;

  @Prop({ type: String, required: false })
  token: string;

  @Prop({ type: Number, required: true })
  total: number;

  @Prop({ type: Boolean, default: false })
  isPaid: boolean;

  @Prop({ type: Date, required: false })
  datePaid: Date;

  @Prop({ type: UserSchema, required: true })
  user: IUser;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
