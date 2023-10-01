export interface Product {
	category: string;
	currency: string;
	description: string;
	discount: number;
	id: string;
	image_url: string;
	name: string;
	price: number;
	quantity: number;
}

export interface ProductCreated {
	id: string;
	in: string;
	out: string;
	product_name: string;
	quantity: number;
}
