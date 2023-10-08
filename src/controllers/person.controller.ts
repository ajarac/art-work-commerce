import { Controller, Get, Param, Query } from '@nestjs/common';
import { PaginationRequestQueryParams, PaginationResponse } from '../helpers/pagination';
import { Artist } from '../models/artist';
import { PersonRepository } from '../repositories/person.repository';

@Controller()
export class PersonController {
	constructor(private readonly personRepository: PersonRepository) {}

	@Get('persons')
	getArtists(@Query() { page, limit }: PaginationRequestQueryParams): Promise<PaginationResponse<Artist>> {
		return this.personRepository.getPersons(page, limit);
	}

	@Get('persons/:id')
	getArtistById(@Param('id') id: string): Promise<Artist> {
		return this.personRepository.getPersonById(id);
	}
}
