import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IWallet } from '../interfaces';
import { IUser, User } from '@src/modules/user';
import { Types } from 'mongoose';

@Schema({ timestamps: true })
export class Wallet implements IWallet {
  @Prop({ type: Number, required: true, default: 0 })
  balance: number;

  @Prop({ type: Boolean, required: false, default: true })
  status: boolean;

  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  user: IUser;
}

export const WalletSchema = SchemaFactory.createForClass(Wallet);
