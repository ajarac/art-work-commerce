import { Controller, Get, Param, Query } from '@nestjs/common';
import { ArtistRepository, TopArtists } from '../repositories/artist.repository';
import { PaginationRequestQueryParams, PaginationResponse } from '../helpers/pagination';
import { Artist } from '../models/artist';

@Controller()
export class ArtistController {
	constructor(private readonly artistRepository: ArtistRepository) {}

	@Get('artists')
	async getArtists(@Query() { page, limit }: PaginationRequestQueryParams): Promise<PaginationResponse<Artist>> {
		return this.artistRepository.getArtists(page, limit);
	}

	@Get('artists/:id')
	async getArtistById(@Param('id') id: string): Promise<Artist> {
		return this.artistRepository.getArtistById(id);
	}

	@Get('artist/top/creators')
	async getTopCreators(@Query() { page, limit }: PaginationRequestQueryParams): Promise<PaginationResponse<TopArtists>> {
		return this.artistRepository.getTopCreators(page, limit);
	}
}
