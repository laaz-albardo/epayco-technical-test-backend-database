import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  ParseIntPipe,
  ParseBoolPipe,
  Req,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { ParseMongoIdPipe } from '@src/shared';
import { AuthAll } from '../auth';
import { FastifyRequest } from 'fastify';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @AuthAll()
  @Post('create-invoice/:document/:phoneNumber')
  create(
    @Param('document') document: string,
    @Param('phoneNumber') phoneNumber: string,
    @Body() createOrderDto: CreateOrderDto,
  ) {
    return this.orderService.initiatePayment(
      document,
      phoneNumber,
      createOrderDto,
    );
  }

  @AuthAll()
  @Get()
  findAll(
    @Query('user', new ParseMongoIdPipe({ optional: true }))
    user?: string,
    @Query('isPaid', new ParseBoolPipe({ optional: true }))
    isPaid?: boolean,
    @Query('orderByDatePaid', new ParseIntPipe({ optional: true }))
    orderByDatePaid?: number,
    @Query('orderByCreatedAt', new ParseIntPipe({ optional: true }))
    orderByCreatedAt?: number,
  ) {
    return this.orderService.findAll(
      user,
      isPaid,
      orderByDatePaid,
      orderByCreatedAt,
    );
  }

  @AuthAll()
  @Get('my-orders')
  findMyOrders(
    @Req() req: FastifyRequest,
    @Query('isPaid', new ParseBoolPipe({ optional: true }))
    isPaid?: boolean,
    @Query('orderByDatePaid', new ParseIntPipe({ optional: true }))
    orderByDatePaid?: number,
    @Query('orderByCreatedAt', new ParseIntPipe({ optional: true }))
    orderByCreatedAt?: number,
  ) {
    return this.orderService.findAll(
      req['user'].id,
      isPaid,
      orderByDatePaid,
      orderByCreatedAt,
    );
  }

  @AuthAll()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(id);
  }
}
