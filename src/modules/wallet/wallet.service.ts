import {
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { WalletRepository } from './repositories';
import { Wallet } from './schemas';
import { WalletDocument } from './types';
import { UpdateUserWalletDto } from './dto';

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
    const walletByUser = await this.repository.findOne({ 'user._id': _id });

    return walletByUser;
  }

  async findOneByDocumentAndPhoneNumber(
    document: string,
    phoneNumber: string,
  ): Promise<WalletDocument> {
    this.logger.log('get wallet...');

    const walletByUser = await this.repository.findOne({
      'user.person.dni': document,
      'user.person.phoneNumber': phoneNumber,
    });

    if (!walletByUser) {
      throw new NotFoundException('Wallet not found');
    }

    this.logger.log('wallet successfully');

    return walletByUser;
  }

  async update(
    document: string,
    phoneNumber: string,
    data: UpdateWalletDto,
  ): Promise<Wallet> {
    try {
      this.logger.log('update wallet...');

      const validateWallet = await this.findOneByDocumentAndPhoneNumber(
        document,
        phoneNumber,
      );

      if (!validateWallet.status) {
        throw new ConflictException('The wallet is not active');
      }

      const updateWallet = await this.repository.update(validateWallet.id, {
        balance: data.balance,
      } as any);

      this.logger.log('wallet updated successfully');

      return updateWallet;
    } catch (err) {
      throw err;
    }
  }

  async updateUser(_id: string, data: UpdateUserWalletDto): Promise<Wallet> {
    try {
      this.logger.log('update user wallet...');

      const validateWallet = await this.findOneByUser(_id);

      console.log(validateWallet);

      const updateWallet = await this.repository.update(validateWallet.id, {
        user: data,
      } as any);

      this.logger.log('user wallet updated successfully');

      return updateWallet;
    } catch (err) {
      throw err;
    }
  }

  async updateWalletOrder(_id: string, balance: number): Promise<Wallet> {
    try {
      this.logger.log('update wallet...');

      const validateWallet = await this.findOneByUser(_id);

      const updateWallet = await this.repository.update(validateWallet.id, {
        balance: balance,
      } as any);

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
