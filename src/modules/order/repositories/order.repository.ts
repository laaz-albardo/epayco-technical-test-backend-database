import { BaseMongoDbRepository } from '@src/shared';
import { Injectable } from '@nestjs/common';
import { Order } from '../schemas';
import { InjectModel } from '@nestjs/mongoose';
import { OrderDocument } from '../types';
import { FilterQuery, Model } from 'mongoose';
import { IOrder } from '../interfaces';
import { IUser } from '@src/modules/user';

@Injectable()
export class OrderRepository extends BaseMongoDbRepository<OrderDocument> {
  constructor(@InjectModel(Order.name) repository: Model<OrderDocument>) {
    super(Order.name, repository);
  }

  async create(data: IOrder): Promise<OrderDocument> {
    return new this.repository(data);
  }

  async findAll(
    user?: string,
    isPaid?: boolean,
    orderByDatePaid?: number,
    orderByCreatedAt?: number,
  ): Promise<OrderDocument[] | any> {
    const filter: FilterQuery<OrderDocument> = {};

    const sortFilter = {};

    if (user) {
      filter['user'] = user;
    }

    if (isPaid) {
      filter['isPaid'] = isPaid;
    }

    if (orderByDatePaid) {
      sortFilter['datePaid'] = orderByDatePaid;
    }

    sortFilter['createdAt'] = orderByCreatedAt ?? -1;

    return await this.repository.find(filter).sort(sortFilter).exec();
  }

  async updateUserData(_id: string, user: IUser) {
    return await this.repository.updateMany({ 'user._id': _id }, { user });
  }
}
