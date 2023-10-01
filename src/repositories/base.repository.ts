import { Surreal } from 'surrealdb.js';
import { PaginationResponse } from '../helpers/pagination';
import { SurrealIdMapper } from './id.mapper';

type Entity = { id: string } & Record<string | number | symbol, unknown>;

export class BaseRepository {
	constructor(protected readonly surrealDB: Surreal) {}

	protected async getPaginationEntity<T extends Entity>(table: string, page: number, limit: number): Promise<PaginationResponse<T>> {
		const paginationQuery = `SELECT *
                             FROM ${table}
                             ORDER BY when DESC LIMIT $limit
                             START $start`;
		const totalQuery = `SELECT count()
                        FROM ${table}
                        GROUP ALL`;
		const variablesQuery = {
			limit: limit,
			start: (page - 1) * limit,
		};
		const [entities, total] = await this.surrealDB.query<
			[
				T[],
				{
					count: number;
				}[],
			]
		>(`${paginationQuery};${totalQuery}`, variablesQuery);
		return {
			total: total.result[0].count,
			result: entities.result.map((entity) => ({
				...entity,
				id: SurrealIdMapper(entity.id),
			})),
		};
	}

	protected async getEntityById<T extends Entity>(table: string, id: string): Promise<T> {
		const surrealId = `${table}:${id}`;
		const [entity] = await this.surrealDB.select<T>(surrealId);
		return entity ? { ...entity, id: SurrealIdMapper(entity.id) } : null;
	}
}
