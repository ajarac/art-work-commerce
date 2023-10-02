import { Controller, Get, Param, Query } from '@nestjs/common';
import { Product } from '../models/product';
import { PaginationRequestQueryParams, PaginationResponse } from '../helpers/pagination';
import { ProductRepository } from '../repositories/product.repository';

@Controller()
export class ProductController {
	constructor(private readonly productRepository: ProductRepository) {}

	@Get('products')
	async getProducts(@Query() { page, limit }: PaginationRequestQueryParams): Promise<PaginationResponse<Product>> {
		return this.productRepository.getProducts(page, limit);
	}

	@Get('products/:id')
	async getProductById(@Param('id') id: string): Promise<Product> {
		return this.productRepository.getProductById(id);
	}
}
