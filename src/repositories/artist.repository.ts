import { Injectable } from '@nestjs/common';
import { Surreal } from 'surrealdb.js';
import { Artist } from '../models/artist';
import { PaginationResponse } from '../helpers/pagination';
import { BaseRepository } from './base.repository';

const ARTIST_TABLE = 'artist';

type SurrealArtist = Artist & Record<string | number | symbol, unknown>;

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
}
