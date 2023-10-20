export type SkinportSearchResponse = SkinportSearchResponseItem[];

export interface SkinportSearchResponseItem {
  market_hash_name: string;
  currency: "EUR" | "USD";
  suggested_price: number;
  item_page: string;
  market_page: string;
  min_price: number;
  max_price: number;
  mean_price: number;
  quantity: number;
  created_at: number;
  updated_at: number;
}
