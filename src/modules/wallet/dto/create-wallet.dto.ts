import { IWallet } from '../interfaces';
import { IUser } from '@src/modules/user';
import {
  IsBoolean,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class CreateWalletDto implements IWallet {
  @IsOptional()
  @IsNumber()
  balance: number;

  @IsOptional()
  @IsBoolean()
  status: boolean;

  @IsNotEmpty()
  @IsMongoId()
  user: IUser;
}
