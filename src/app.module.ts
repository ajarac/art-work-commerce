import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { ArtistRepository } from './repositories/artist.repository';
import { ArtistController } from './controllers/artist.controller';
import { Surreal } from 'surrealdb.js';
import { PersonController } from './controllers/person.controller';
import { PersonRepository } from './repositories/person.repository';
import { ProductRepository } from './repositories/product.repository';
import { ProductController } from './controllers/product.controller';

const SurrealProvider = {
	provide: Surreal,
	useFactory: async () => {
		// Connect to the database
		const db = new Surreal();
		await db.connect('http://0.0.0.0:8000/rpc');

		// Sign in as a namespace, database, or root user
		await db.signin({
			user: 'root',
			pass: 'password',
		});

		// Select a specific namespace / database
		await db.use({ ns: 'test', db: 'test' });
		return db;
	},
};

@Module({
	imports: [],
	controllers: [AppController, ArtistController, PersonController, ProductController],
	providers: [SurrealProvider, ArtistRepository, PersonRepository, ProductRepository],
})
export class AppModule {}
