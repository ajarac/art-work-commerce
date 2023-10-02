import { Order } from '../models/order';
import { Injectable } from '@nestjs/common';
import { PaginationResponse } from '../helpers/pagination';
import { Surreal } from 'surrealdb.js';
import { SurrealIdMapper } from './id.mapper';
import { BaseRepository } from './base.repository';
import * as moment from 'moment';

const ORDER_TABLE = 'order';

type SurrealOrder = Order & Record<string | number | symbol, unknown>;

export interface OrderQueryFilter {
	page: number;
	limit: number;
	country: string;
	startDate: Date;
	endDate: Date;
}

@Injectable()
export class OrderRepository extends BaseRepository {
	constructor(surrealDB: Surreal) {
		super(surrealDB);
	}

	async getOrders(page: number, limit: number): Promise<PaginationResponse<Order>> {
		return this.getPaginationEntity<SurrealOrder>(ORDER_TABLE, page, limit);
	}

	async getOrdersFiltered(query: OrderQueryFilter): Promise<PaginationResponse<Order>> {
		const fromQuery = `${ORDER_TABLE}:[$country, $startDate]..=[$country, $endDate]`;
		const paginationQuery = `SELECT *
                             FROM ${fromQuery} LIMIT $limit
                             START $start`;
		const totalQuery = `SELECT count()
                        FROM ${fromQuery}
                        GROUP ALL`;
		const variablesQuery = {
			country: query.country,
			startDate: (query.startDate && moment(query.startDate).format('YYYY-MM-DD')) || null,
			endDate: moment(query.endDate).add(1, 'day').format('YYYY-MM-DD'),
			limit: query.limit,
			start: (query.page - 1) * query.limit,
		};

		const [orders, total] = await this.surrealDB.query<[SurrealOrder[], { count: number }[]]>(
			`${paginationQuery};${totalQuery}`,
			variablesQuery,
		);
		return {
			total: total.result[0]?.count || 0,
			result: orders.result.map((order) => ({ ...order, id: SurrealIdMapper(order.id) })),
		};
	}
}
