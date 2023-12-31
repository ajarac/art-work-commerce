import { Controller, Get, Param, Query } from '@nestjs/common';
import { Product } from '../models/product';
import { PaginationRequestQueryParams, PaginationResponse } from '../helpers/pagination';
import { ProductRepository } from '../repositories/product.repository';

@Controller()
export class ProductController {
	constructor(private readonly productRepository: ProductRepository) {}

	@Get('products')
	getProducts(@Query() { page, limit }: PaginationRequestQueryParams): Promise<PaginationResponse<Product>> {
		return this.productRepository.getProducts(page, limit);
	}

	@Get('products/:id')
	getProductById(@Param('id') id: string): Promise<Product> {
		return this.productRepository.getProductById(id);
	}

	@Get('artist/:id/products')
	async getProductsByArtistId(@Param('id') artistId: string): Promise<Product[]> {
		return this.productRepository.getProductsByArtistId(artistId);
	}

	@Get('person/:id/products/recommended')
	getProductsRecommendedByPersonId(@Param('id') personId: string): Promise<Product[]> {
		return this.productRepository.getRecommendedProductsByPersonId(personId);
	}
}
