import { Controller, Get, Param, Query } from '@nestjs/common';
import { ArtistRepository } from '../repositories/artist.repository';
import { PaginationResponse } from '../helpers/pagination';
import { Artist } from '../models/artist';

@Controller()
export class ArtistController {
	constructor(private readonly artistRepository: ArtistRepository) {}

	@Get('artists')
	async getArtists(@Query('page') page: string, @Query('limit') limit: string): Promise<PaginationResponse<Artist>> {
		const pageInt = parseInt(page) || 1;
		const limitInt = parseInt(limit) || 10;
		return this.artistRepository.getArtists(pageInt, limitInt);
	}

	@Get('artists/:id')
	async getArtistById(@Param('id') id: string): Promise<Artist> {
		return this.artistRepository.getArtistById(id);
	}
}
