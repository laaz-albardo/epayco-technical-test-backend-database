import {
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderRepository } from './repositories';
import { Order } from './schemas';
import { OrderDocument } from './types';
import { WalletService } from '../wallet';

@Injectable()
export class OrderService {
  private readonly logger = new Logger(OrderRepository.name);

  constructor(
    private readonly repository: OrderRepository,
    private readonly walletService: WalletService,
  ) {}

  async create(data: CreateOrderDto): Promise<Order> {
    try {
      this.logger.log('creating order...');

      let order = await this.repository.create(data);

      order = await this.repository.save(order);

      this.logger.log('order created successfully');

      return order;
    } catch (err) {
      throw err;
    }
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

    const orderById = await (
      await this.repository.findOneById(_id)
    ).populate('user');

    this.logger.log('order successfully');

    return orderById;
  }

  async update(_id: string, data: UpdateOrderDto): Promise<Order> {
    try {
      this.logger.log('update order...');

      const validateOrder = await this.findOne(_id);

      if (!validateOrder) {
        throw new NotFoundException('Order not found');
      }

      if (validateOrder.isPaid || validateOrder.datePaid) {
        throw new ConflictException('This order is already paid');
      }

      const userWallet = await this.walletService.findOneByUser(
        validateOrder.user.id,
      );

      if (data.total > userWallet.balance) {
        throw new ConflictException(
          'Does not have the balance to pay the bill',
        );
      }

      const updateOrder = await this.repository.update(validateOrder.id, {
        isPaid: true,
        datePaid: new Date(),
      } as OrderDocument);

      this.logger.log('order updated successfully');

      return updateOrder;
    } catch (err) {
      throw err;
    }
  }

  remove(id: string) {
    return `This action removes a #${id} order`;
  }
}
