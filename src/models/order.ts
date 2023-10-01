import { Address } from './address';

export interface Order {
	currency: string;
	discount: string;
	id: string;
	in: string;
	order_date: string;
	order_status: string;
	out: string;
	payment_method: string;
	price: number;
	product_name: string;
	quantity: number;
	shipping_address: Address;
}
