import { Controller, Get, Param, Query } from '@nestjs/common';
import { PaginationResponse } from '../helpers/pagination';
import { Artist } from '../models/artist';
import { PersonRepository } from '../repositories/person.repository';

@Controller()
export class PersonController {
	constructor(private readonly personRepository: PersonRepository) {}

	@Get('persons')
	async getArtists(@Query('page') page: string, @Query('limit') limit: string): Promise<PaginationResponse<Artist>> {
		const pageInt = parseInt(page) || 1;
		const limitInt = parseInt(limit) || 10;
		return this.personRepository.getPersons(pageInt, limitInt);
	}

	@Get('persons/:id')
	async getArtistById(@Param('id') id: string): Promise<Artist> {
		return this.personRepository.getPersonById(id);
	}
}
