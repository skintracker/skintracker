export interface BitskinsSearchResponse {
  counter: {
    total: number;
    filtered: number;
  };
  list: BitskinsItem[];
}

export interface BitskinsItem {
  id: string;
  asset_id: string;
  skin_id: number;
  bot_id: number;
  price: number;
  float_id: string;
  float_value: number;
  tradehold: number;
  paint_seed: number;
  paint_index: number;
  stickers: BitskinsSticker[];
  sticker_counter: number;
  ss: number;
  status: number;
  bumped_at: string;
  name: string;
  class_id: string;
  skin_status: number;
  discount: number;
  hightier: number;
  suggested_price: number;
  category_id: number;
  collection_id: number[];
  exterior_id: number;
  paint_id: number;
  type_id: number;
  typesub_id: number;
  quality_id: number;
  bot_steam_id: string;
}

export interface BitskinsSticker {
  name: string;
  slot: number;
  type: "Sticker";
  skin_id: number;
  class_id: string;
  skin_status: number;
}
