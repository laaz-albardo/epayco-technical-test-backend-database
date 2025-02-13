import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { WalletRepository } from './repositories';
import { Wallet } from './schemas';
import { WalletDocument } from './types';

@Injectable()
export class WalletService {
  private readonly logger = new Logger(WalletRepository.name);

  constructor(private readonly repository: WalletRepository) {}

  async create(data: CreateWalletDto): Promise<Wallet> {
    try {
      this.logger.log('creating wallet...');

      let wallet = await this.repository.create(data);

      wallet = await this.repository.save(wallet);

      this.logger.log('wallet created successfully');

      return wallet;
    } catch (err) {
      throw err;
    }
  }

  async findOneByUser(_id: string): Promise<WalletDocument> {
    const walletByUser = await (
      await this.repository.findOne({ user: _id })
    ).populate('user');

    return walletByUser;
  }

  async update(_id: string, data: UpdateWalletDto): Promise<Wallet> {
    try {
      this.logger.log('update wallet...');

      const validateWallet = await this.findOneByUser(_id);

      if (!validateWallet) {
        throw new NotFoundException('Wallet not found');
      }

      const updateWallet = await this.repository.update(
        validateWallet.id,
        data as WalletDocument,
      );

      this.logger.log('wallet updated successfully');

      return updateWallet;
    } catch (err) {
      throw err;
    }
  }

  async remove(_id: string) {
    try {
      this.logger.log('delete wallet...');

      const validateWallet = await this.findOneByUser(_id);

      if (!validateWallet) {
        throw new NotFoundException('Wallet not found');
      }

      const deleteWallet = await this.repository.delete(validateWallet.id);

      this.logger.log('wallet deleted successfully');

      return deleteWallet;
    } catch (err) {
      throw err;
    }
  }
}
