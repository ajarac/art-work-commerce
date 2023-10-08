import { Injectable } from '@nestjs/common';
import { BaseRepository } from './base.repository';
import { Surreal } from 'surrealdb.js';
import { PaginationResponse } from '../helpers/pagination';
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

	async getReviews(page: number, limit: number): Promise<PaginationResponse<Review>> {
		return this.getPaginationEntity<SurrealReview>(REVIEW_TABLE, page, limit);
	}

	async getReviewExtendedById(id: string): Promise<ReviewExtended> {
		const query = `select * from review:${id} fetch person, artist, product`;
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
