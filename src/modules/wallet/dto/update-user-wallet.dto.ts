import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateWalletDto } from './create-wallet.dto';

export class UpdateUserWalletDto extends PartialType(
  OmitType(CreateWalletDto, ['balance', 'status'] as const),
) {}
