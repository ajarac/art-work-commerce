import { Injectable } from '@nestjs/common';
import { Product } from '../models/product';
import { PaginationResponse } from '../helpers/pagination';
import { Surreal } from 'surrealdb.js';
import { BaseRepository } from './base.repository';

const PRODUCT_TABLE = 'product';

type SurrealProduct = Product & Record<string | number | symbol, unknown>;

@Injectable()
export class ProductRepository extends BaseRepository {
	constructor(surrealDB: Surreal) {
		super(surrealDB);
	}

	async getProducts(page: number, limit: number): Promise<PaginationResponse<Product>> {
		return this.getPaginationEntity<SurrealProduct>(PRODUCT_TABLE, page, limit);
	}

	async getProductById(id: string): Promise<Product> {
		return this.getEntityById<SurrealProduct>(PRODUCT_TABLE, id);
	}
}
