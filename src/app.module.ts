import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { ArtistRepository } from './repositories/artist.repository';
import { ArtistController } from './controllers/artist.controller';
import { PersonController } from './controllers/person.controller';
import { PersonRepository } from './repositories/person.repository';
import { ProductRepository } from './repositories/product.repository';
import { ProductController } from './controllers/product.controller';
import { OrderRepository } from './repositories/order.repository';
import { OrderController } from './controllers/order.controller';
import { ReviewRepository } from './repositories/review.repository';
import { ReviewController } from './controllers/review.controller';

import { Surreal } from 'surrealdb.js';
const surrealDbUrl = process.env.SURREALDB_URL || 'http://0.0.0.0:8000/rpc';
const surrealDbUser = process.env.SURREALDB_USER || 'root';
const surrealDbPass = process.env.SURREALDB_PASS || 'password';
const surrealDBNs = process.env.SURREALDB_NS || 'upc';
const surrealDbDatabase = process.env.SURREALDB_DB || 'art_work';

const SurrealProvider = {
	provide: Surreal,
	useFactory: async () => {
		// Connect to the database
		const db = new Surreal();
		await db.connect(surrealDbUrl);

		// Sign in as a namespace, database, or root user
		await db.signin({
			user: surrealDbUser,
			pass: surrealDbPass,
		});

		// Select a specific namespace / database
		await db.use({ ns: surrealDBNs, db: surrealDbDatabase });
		return db;
	},
};

@Module({
	imports: [],
	controllers: [AppController, ArtistController, PersonController, ProductController, OrderController, ReviewController],
	providers: [SurrealProvider, ArtistRepository, PersonRepository, ProductRepository, OrderRepository, ReviewRepository],
})
export class AppModule {}
