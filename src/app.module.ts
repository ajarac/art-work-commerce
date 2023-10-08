import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { ArtistRepository } from './repositories/artist.repository';
import { ArtistController } from './controllers/artist.controller';
import { Surreal } from 'surrealdb.js';
import { PersonController } from './controllers/person.controller';
import { PersonRepository } from './repositories/person.repository';
import { ProductRepository } from './repositories/product.repository';
import { ProductController } from './controllers/product.controller';
import { OrderRepository } from './repositories/order.repository';
import { OrderController } from './controllers/order.controller';
import { ReviewRepository } from './repositories/review.repository';
import { ReviewController } from './controllers/review.controller';

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
		await db.use({ ns: 'upc', db: 'art_work' });
		return db;
	},
};

@Module({
	imports: [],
	controllers: [AppController, ArtistController, PersonController, ProductController, OrderController, ReviewController],
	providers: [SurrealProvider, ArtistRepository, PersonRepository, ProductRepository, OrderRepository, ReviewRepository],
})
export class AppModule {}
