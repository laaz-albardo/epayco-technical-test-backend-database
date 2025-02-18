import {
  BadRequestException,
  ConflictException,
  Injectable,
  Logger,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderRepository } from './repositories';
import { OrderDocument } from './types';
import { WalletService } from '../wallet';
import { EventEmitter2 } from '@nestjs/event-emitter';
import * as crypto from 'crypto';

@Injectable()
export class OrderService {
  private readonly logger = new Logger(OrderRepository.name);

  constructor(
    private readonly repository: OrderRepository,
    private readonly walletService: WalletService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async initiatePayment(
    document: string,
    phoneNumber: string,
    data: CreateOrderDto,
  ) {
    try {
      const wallet = await this.walletService.findOneByDocumentAndPhoneNumber(
        document,
        phoneNumber,
      );

      const sesionId = crypto.randomBytes(16).toString('hex');
      const token = Math.floor(100000 + Math.random() * 900000).toString();

      await this.repository.save({
        total: data.total,
        sesionId,
        token,
        user: wallet.user,
      } as any);

      const dataEmail = {
        email: wallet.user.email,
        person: wallet.user.person,
        sesionId,
        token,
      };

      this.eventEmitter.emit('SEND_MAILER', dataEmail);

      return { message: 'Confirmation token sent', sesionId };
    } catch (err) {
      throw err;
    }
  }

  async confirmPayment(sesionId: string, token: string) {
    const order = await this.repository.findOne({
      sesionId: sesionId,
      token: token,
    });

    if (!order) {
      throw new BadRequestException('Order not found');
    }

    const wallet = await this.walletService.findOneByUser(order.user.id);

    if (!wallet.status) {
      throw new ConflictException('This wallet is not active');
    }

    if (wallet.balance < order.total) {
      throw new ConflictException('Insufficient amount to pay');
    }

    const pay = wallet.balance - order.total;

    await this.walletService.updateWalletOrder(order.user.id, pay);

    await this.repository.update(order.id, {
      isPaid: true,
      datePaid: new Date(),
    } as any);

    return { mensaje: 'Payment confirmed and successfully completed' };
  }

  async findAll(
    user?: string,
    isPaid?: boolean,
    orderByDatePaid?: number,
    orderByCreatedAt?: number,
  ): Promise<OrderDocument[]> {
    try {
      this.logger.log('list orders...');

      const orders = await this.repository.findAll(
        user,
        isPaid,
        orderByDatePaid,
        orderByCreatedAt,
      );

      this.logger.log('orders listed successfully');

      return orders;
    } catch (err) {
      throw err;
    }
  }

  async findOne(_id: string): Promise<OrderDocument> {
    this.logger.log('get order by id...');

    const orderById = await this.repository.findOneById(_id);

    this.logger.log('order successfully');

    return orderById;
  }

  async updateUserOrder(_id: string, data: UpdateOrderDto) {
    try {
      this.logger.log('update order...');

      const validateOrder = await this.repository.updateUserData(
        _id,
        data as any,
      );

      this.logger.log('order updated successfully');

      return validateOrder;
    } catch (err) {
      throw err;
    }
  }
}
