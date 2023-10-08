import { Injectable } from '@nestjs/common';
import { Surreal } from 'surrealdb.js';
import { Artist } from '../models/artist';
import { buildPaginationQuery, PaginationResponse } from '../helpers/pagination';
import { BaseRepository } from './base.repository';
import { SurrealIdMapper } from './id.mapper';
import { SurrealResultType } from '../helpers/surreal-result.type';

const ARTIST_TABLE = 'artist';

type SurrealArtist = SurrealResultType<Artist>;

export interface TopArtists {
	total: number;
	id: string;
}
type SurrealTopArtist = SurrealResultType<TopArtists>;

@Injectable()
export class ArtistRepository extends BaseRepository {
	constructor(surrealDB: Surreal) {
		super(surrealDB);
	}

	async getArtists(page: number, limit: number): Promise<PaginationResponse<Artist>> {
		return this.getPaginationEntity<SurrealArtist>(ARTIST_TABLE, page, limit);
	}

	async getArtistById(id: string): Promise<Artist> {
		return this.getEntityById<SurrealArtist>(ARTIST_TABLE, id);
	}

	async getTopCreators(page, limit: number): Promise<PaginationResponse<TopArtists>> {
		const queryTop = 'select count() as total, in as id from create group by id order by total desc limit $limit start $start';
		const queryCount = 'select count() from (select count() as total, in from create group by in order by total desc) group all';
		const query = `${queryTop};${queryCount}`;
		const variablesQuery = buildPaginationQuery(page, limit);
		const [entities, total] = await this.surrealDB.query<[SurrealTopArtist[], { count: number }[]]>(query, variablesQuery);
		return {
			total: total.result[0]?.count || 0,
			result: entities.result.map((entity) => ({ ...entity, id: SurrealIdMapper(entity.id) })),
		};
	}
}
