import { Controller, Get, Body, Patch, Req } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { AuthAll } from '../auth';
import { FastifyRequest } from 'fastify';

@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @AuthAll()
  @Get('my-wallet')
  findOne(@Req() req: FastifyRequest) {
    return this.walletService.findOneByUser(req['user']._id);
  }

  @AuthAll()
  @Patch('update-wallet')
  update(@Req() req: FastifyRequest, @Body() updateWalletDto: UpdateWalletDto) {
    return this.walletService.update(req['user']._id, updateWalletDto);
  }
}
