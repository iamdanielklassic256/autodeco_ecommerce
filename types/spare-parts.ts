import { MeasurementUnit } from "./measurement-unit";

export interface SparePart {
	id: string;
	part_name: string;
	brand: string;
	image?: string;
	category: string;
	compatible_models: string[];
	measurement_unit: MeasurementUnit;
	buying_price: number;
	reseller_price: number;
	spare_part_shop_price: number;
	final_consumer_price: number;
	quantity_in_stock: number;
	reorder_level: number;
	supplier_id?: string;
	is_low_stock?: boolean;
	createdAt: string;
	updatedAt: string;
}