import { Injectable } from '@nestjs/common';
import { Surreal } from 'surrealdb.js';
import { PaginationResponse } from '../helpers/pagination';
import { Person } from '../models/person';
import { BaseRepository } from './base.repository';

const PERSON_TABLE = 'person';
type SurrealPerson = Person & Record<string | number | symbol, unknown>;

@Injectable()
export class PersonRepository extends BaseRepository {
	constructor(surrealDB: Surreal) {
		super(surrealDB);
	}

	async getPersons(page: number, limit: number): Promise<PaginationResponse<Person>> {
		return this.getPaginationEntity<SurrealPerson>(PERSON_TABLE, page, limit);
	}

	async getPersonById(id: string): Promise<Person> {
		return this.getEntityById<SurrealPerson>(PERSON_TABLE, id);
	}
}
