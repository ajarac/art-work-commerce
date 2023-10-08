import { IsNumber } from 'class-validator';

export class PaginationRequestQueryParams {
	@IsNumber()
	page: number;
	@IsNumber()
	limit: number;
}

export interface PaginationResponse<T> {
	result: T[];
	total: number;
}

export const buildPaginationQuery = (page: number, limit: number) => ({
	limit: limit,
	start: (page - 1) * limit,
});
