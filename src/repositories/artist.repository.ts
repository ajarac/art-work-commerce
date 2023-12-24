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
	artist: Artist;
	total: number;
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
		const queryTop =
			'SELECT count() AS total, in AS artist FROM create GROUP BY artist ORDER BY total DESC LIMIT $limit START $start FETCH artist';
		const queryCount = 'SELECT count() FROM (SELECT in FROM create GROUP BY in) GROUP ALL';
		const query = `${queryTop};${queryCount}`;
		const variablesQuery = buildPaginationQuery(page, limit);
		const [entities, total] = await this.surrealDB.query<
			[
				SurrealTopArtist[],
				{
					count: number;
				}[],
			]
		>(query, variablesQuery);
		return {
			total: total.result[0]?.count || 0,
			result: entities.result.map(({ total, artist }) => {
				return {
					total,
					artist: {
						...artist,
						id: SurrealIdMapper(artist.id),
					},
				};
			}),
		};
	}
}
