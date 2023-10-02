import { Order } from '../models/order';
import { Injectable } from '@nestjs/common';
import { PaginationResponse } from '../helpers/pagination';
import { Surreal } from 'surrealdb.js';
import { BaseRepository } from './base.repository';

const ORDER_TABLE = 'order';

type SurrealOrder = Order & Record<string | number | symbol, unknown>;

@Injectable()
export class OrderRepository extends BaseRepository {
	constructor(surrealDB: Surreal) {
		super(surrealDB);
	}

	async getOrders(page: number, limit: number): Promise<PaginationResponse<Order>> {
		return this.getPaginationEntity<SurrealOrder>(ORDER_TABLE, page, limit);
	}

	async getOrderById(id: string): Promise<Order> {
		return this.getEntityById<SurrealOrder>(ORDER_TABLE, id);
	}
}
