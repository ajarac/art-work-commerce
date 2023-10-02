import { Controller, Get, Param, Query } from '@nestjs/common';
import { OrderRepository } from '../repositories/order.repository';
import { Order } from '../models/order';
import { PaginationResponse } from '../helpers/pagination';

@Controller()
export class OrderController {
	constructor(private readonly orderRepository: OrderRepository) {}

	@Get('orders')
	async getOrders(@Query('page') page: string, @Query('limit') limit: string): Promise<PaginationResponse<Order>> {
		const pageInt = parseInt(page) || 1;
		const limitInt = parseInt(limit) || 10;
		return this.orderRepository.getOrders(pageInt, limitInt);
	}

	@Get('orders/:city/:datetime')
	async getOrderBy(@Param('city') city: string, @Param('datetime') datetime: string): Promise<Order> {
		const id = [city, datetime];
		return this.orderRepository.getOrderById(JSON.stringify(id));
	}
}
