import { IBase } from '@src/shared';
import { IUser } from '@src/modules/user';

export interface IOrder extends Partial<IBase> {
  sesionId?: string;
  token?: string;
  total: number;
  isPaid?: boolean;
  datePaid?: Date;
  user: IUser;
}
