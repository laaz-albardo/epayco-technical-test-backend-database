import { IBase } from '@src/shared';
import { IUser } from '@src/modules/user';

export interface IWallet extends Partial<IBase> {
  balance: number;
  status: boolean;
  user: IUser;
}
