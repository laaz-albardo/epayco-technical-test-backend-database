import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IWallet } from '../interfaces';
import { IUser, UserSchema } from '@src/modules/user';

@Schema({ timestamps: true })
export class Wallet implements IWallet {
  @Prop({ type: Number, required: true, default: 0 })
  balance: number;

  @Prop({ type: Boolean, required: false, default: true })
  status: boolean;

  @Prop({ type: UserSchema, required: true })
  user: IUser;
}

export const WalletSchema = SchemaFactory.createForClass(Wallet);
