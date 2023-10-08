import { Artist } from './artist';
import { Person } from './person';
import { Product } from './product';

export interface Review {
	artist: string;
	id: string;
	person: string;
	product: string;
	rating: number;
	review_text: string;
}

export interface ReviewExtended {
	id: string;
	artist: Artist;
	person: Person;
	product: Product;
	rating: number;
	review_text: string;
}
