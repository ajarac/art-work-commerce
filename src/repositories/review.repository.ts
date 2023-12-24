import { Injectable } from '@nestjs/common';
import { BaseRepository } from './base.repository';
import { Surreal } from 'surrealdb.js';
import { buildPaginationQuery, PaginationResponse } from '../helpers/pagination';
import { Review, ReviewExtended } from '../models/review';
import { SurrealResultType } from '../helpers/surreal-result.type';
import { SurrealIdMapper } from './id.mapper';

const REVIEW_TABLE = 'review';
type SurrealReview = SurrealResultType<Review>;
type SurrealReviewExtended = SurrealResultType<ReviewExtended>;

@Injectable()
export class ReviewRepository extends BaseRepository {
	constructor(surrealDB: Surreal) {
		super(surrealDB);
	}

	async getReviewsByProductId(orderId: string, page: number, limit: number): Promise<PaginationResponse<Review>> {
		const query = `SELECT * FROM ${REVIEW_TABLE} WHERE product = $orderId LIMIT $limit START $start`;
		const variablesQuery = {
			orderId: `product:${orderId}`,
			...buildPaginationQuery(page, limit),
		};
		const [reviews, total] = await this.surrealDB.query<[SurrealReview[], { count: number }[]]>(query, variablesQuery);
		return {
			total: total.result[0]?.count || 0,
			result: reviews.result.map((review) => {
				return {
					...review,
					id: SurrealIdMapper(review.id),
				};
			}),
		};
	}

	async getReviewExtendedById(id: string): Promise<ReviewExtended> {
		const query = `SELECT * FROM review:${id} FETCH person, artist, product`;
		const [review] = await this.surrealDB.query<[SurrealReviewExtended[]]>(query);
		const resultReview = review.result[0];
		if (resultReview == null) {
			return null;
		}
		resultReview.id = SurrealIdMapper(resultReview.id);
		resultReview.artist.id = SurrealIdMapper(resultReview.artist.id);
		resultReview.person.id = SurrealIdMapper(resultReview.person.id);
		resultReview.product.id = SurrealIdMapper(resultReview.product.id);
		return resultReview;
	}
}
