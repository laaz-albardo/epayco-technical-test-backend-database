import { BaseMongoDbRepository } from '@src/shared';
import { Wallet } from '../schemas';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { WalletDocument } from '../types';
import { Model } from 'mongoose';
import { IWallet } from '../interfaces';

@Injectable()
export class WalletRepository extends BaseMongoDbRepository<WalletDocument> {
  constructor(@InjectModel(Wallet.name) repository: Model<WalletDocument>) {
    super(Wallet.name, repository);
  }

  async create(data: IWallet): Promise<WalletDocument> {
    return new this.repository(data);
  }
}
