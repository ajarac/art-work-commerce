import { Injectable } from '@nestjs/common';
import { Product } from '../models/product';
import { PaginationResponse } from '../helpers/pagination';
import { Surreal } from 'surrealdb.js';
import { BaseRepository } from './base.repository';
import { SurrealResultType } from '../helpers/surreal-result.type';
import { SurrealIdMapper } from './id.mapper';

const PRODUCT_TABLE = 'product';

type SurrealProduct = SurrealResultType<Product>;

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

	async getProductsByArtistId(artistId: string): Promise<Product[]> {
		const surrealArtistId = `artist:${artistId}`;
		const query = 'select out.* as product from create where in = $id';
		const [products] = await this.surrealDB.query<[{ product: SurrealProduct }[]]>(query, {
			id: surrealArtistId,
		});

		return products.result.map(({ product }) => ({ ...product, id: SurrealIdMapper(product.id) }));
	}
}
