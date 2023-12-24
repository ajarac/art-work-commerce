import { Controller, Get, Param, Query } from '@nestjs/common';
import { PaginationRequestQueryParams, PaginationResponse } from '../helpers/pagination';
import { Review, ReviewExtended } from '../models/review';
import { ReviewRepository } from '../repositories/review.repository';

@Controller()
export class ReviewController {
	constructor(private readonly reviewRepository: ReviewRepository) {}

	@Get('product/:productId/reviews')
	getReviews(
		@Param('productId') productId: string,
		@Query() { page, limit }: PaginationRequestQueryParams,
	): Promise<PaginationResponse<Review>> {
		return this.reviewRepository.getReviewsByProductId(productId, page, limit);
	}

	@Get('reviews/:id')
	getReviewById(@Param('id') id: string): Promise<ReviewExtended> {
		return this.reviewRepository.getReviewExtendedById(id);
	}
}
