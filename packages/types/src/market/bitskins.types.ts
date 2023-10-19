export interface BitskinsSearchResponse {
	status: "success" | "error";
	data: {
		items: BitskinsItem[];
	};
}

export interface BitskinsItem {
	app_id: string;
	context_id: string;
	asset_id: string;
	class_id: string;
	item_id: string;
	instance_id: string;
	market_hash_name: string;
	item_type: string;
	item_class: string;
	item_rarity: string;
	item_weapon: string;
	item_quality: string;
	image: string;
	inspectable: boolean;
	inspect_link: string;
	price: string;
	suggested_price: string;
	is_featured: boolean;
	float_value: string;
	pattern_info: {
		paintindex: number;
		paintseed: number;
		rarity: number;
		quality: number;
		paintwear: number;
	};
	phase: string | null;
	stickers: unknown | null;
	fraud_warnings: string[];
	is_mine: boolean;
}
