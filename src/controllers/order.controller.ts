import { Controller, Get, Query } from '@nestjs/common';
import { OrderQueryFilter, OrderRepository } from '../repositories/order.repository';
import { Order } from '../models/order';
import { PaginationRequestQueryParams, PaginationResponse } from '../helpers/pagination';
import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

class OrderQueryFilterQueryParams implements OrderQueryFilter {
	@IsNotEmpty()
	@IsNumber()
	page: number;
	@IsNotEmpty()
	@IsNumber()
	limit: number;
	@IsString()
	country: string;
	@IsDate()
	@IsOptional()
	startDate: Date;
	@IsDate()
	@IsOptional()
	endDate: Date;
}

@Controller()
export class OrderController {
	constructor(private readonly orderRepository: OrderRepository) {}

	@Get('orders')
	getOrders(@Query() { page, limit }: PaginationRequestQueryParams): Promise<PaginationResponse<Order>> {
		return this.orderRepository.getOrders(page, limit);
	}

	@Get('orders/filtered')
	getOrdersFiltered(@Query() query: OrderQueryFilterQueryParams): Promise<PaginationResponse<Order>> {
		return this.orderRepository.getOrdersFiltered(query);
	}
}
