import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './schemas';
import { OrderRepository } from './repositories';
import { WalletModule } from '../wallet';

@Module({
  imports: [
    MongooseModule.forFeature([{ schema: OrderSchema, name: Order.name }]),
    WalletModule,
  ],
  controllers: [OrderController],
  providers: [OrderService, OrderRepository],
  exports: [OrderService, OrderRepository],
})
export class OrderModule {}
