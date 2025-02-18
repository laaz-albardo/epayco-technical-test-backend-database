import { Controller, Get, Body, Patch, Param } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { AuthAll } from '../auth';

@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @AuthAll()
  @Get('my-wallet/:document/:phoneNumber')
  findOne(
    @Param('document') document: string,
    @Param('phoneNumber') phoneNumber: string,
  ) {
    return this.walletService.findOneByDocumentAndPhoneNumber(
      document,
      phoneNumber,
    );
  }

  @AuthAll()
  @Patch('update-wallet/:document/:phoneNumber')
  update(
    @Param('document') document: string,
    @Param('phoneNumber') phoneNumber: string,
    @Body() updateWalletDto: UpdateWalletDto,
  ) {
    return this.walletService.update(document, phoneNumber, updateWalletDto);
  }
}
