import { Controller, Get, Param, Query } from '@nestjs/common';
import { Product } from '../models/product';
import { PaginationResponse } from '../helpers/pagination';
import { ProductRepository } from '../repositories/product.repository';

@Controller()
export class ProductController {
	constructor(private readonly productRepository: ProductRepository) {}

	@Get('products')
	async getProducts(@Query('page') page: string, @Query('limit') limit: string): Promise<PaginationResponse<Product>> {
		const pageInt = parseInt(page) || 1;
		const limitInt = parseInt(limit) || 10;
		return this.productRepository.getProducts(pageInt, limitInt);
	}

	@Get('products/:id')
	async getProductById(@Param('id') id: string): Promise<Product> {
		return this.productRepository.getProductById(id);
	}
}
