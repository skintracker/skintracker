export interface BuffMarketResponse<T> {
  code: "OK" | "ERROR";
  data: T;
  msg: string | null;
}

export interface BuffMarketTag {
  category: string;
  id: number;
  internal_name: string;
  localized_name: string;
}

export interface BuffMarketSearchGoodsInfo {
  icon_url: string;
  item_id: number | null;
  info: {
    tags: {
      exterior: BuffMarketTag;
      quality: BuffMarketTag;
      rarity: BuffMarketTag;
      type: BuffMarketTag;
      weapon: BuffMarketTag;
    };
  };
  original_icon_url: string;
  steam_price: string;
  steam_price_cny: string;
}

export interface BuffMarketSearchResponseItem {
  appid: number;
  bookmarked: boolean;
  buy_max_price: string;
  buy_num: number;
  can_bargain: boolean;
  can_search_by_tournament: boolean;
  description: string | null;
  game: "csgo";
  goods_info: BuffMarketSearchGoodsInfo;
  has_buff_price_history: boolean;
  id: number;
  market_hash_name: string;
  market_min_price: string;
  name: string;
  quick_price: string;
  sell_min_price: string;
  sell_num: number;
  sell_reference_price: string;
  short_name: string;
  steam_market_url: string;
  transacted_num: number;
}

export interface BuffMarketSearchResponseData {
  items: BuffMarketSearchResponseItem[];
  page_num: number;
  page_size: number;
  total_count: number;
  total_page: number;
}

export interface BuffMarketSellOrderGoodsInfo {
  [key: string]: {
    appid: number;
    can_3d_inspect: boolean;
    can_inspect: boolean;
    description: string | null;
    game: "csgo";
    goods_id: number;
    icon_url: string;
    item_id: number | null;
    market_hash_name: string;
    market_min_price: string;
    name: string;
    original_icon_url: string;
    short_name: string;
    steam_price: string;
    steam_price_cny: string;
    tags: {
      category: BuffMarketTag;
      category_group: BuffMarketTag;
      custom: BuffMarketTag;
      exterior: BuffMarketTag;
      itemset: BuffMarketTag;
      quality: BuffMarketTag;
      rarity: BuffMarketTag;
      type: BuffMarketTag;
      weapon: BuffMarketTag;
      weaponcase: BuffMarketTag;
    };
  };
}

export interface BuffMarketSellOrderMarketStores {
  [key: string]: boolean;
}

export interface BuffMarketSellOrderResponseItem {
  allow_bargain: boolean;
  appid: number;
  asset_info: {
    action_link: string;
    appid: number;
    assetid: string;
    classid: string;
    contextid: number;
    goods_id: number;
    has_tradable_cooldown: boolean;
    info: unknown;
    instanceid: string;
    paintwear: string;
    tradable_cooldown_text: string;
    tradable_unfrozen_time: number | null;
  };
  background_image_url: string;
  bookmarked: boolean;
  can_bargain: boolean;
  can_use_inspect_trn_url: boolean;
  cannot_bargain_reason: string;
  created_at: number;
  description: string | null;
  featured: number;
  fee: string;
  game: "csgo";
  goods_id: number;
  id: string;
  img_src: string;
  income: string;
  lowest_bargain_price: string;
  mode: number;
  price: string;
  recent_average_duration: number | null;
  recent_deliver_rate: number | null;
  state: number;
  supported_pay_methods: number[];
  tradable_cooldown: unknown | null;
  updated_at: number;
  user_id: string;
}

export interface BuffMarketSellOrderUserInfo {
  [key: string]: {
    avatar: string;
    avatar_safe: string;
    is_auto_accept: boolean;
    is_premium_vip: boolean;
    nickname: string;
    seller_level: 0;
    shop_id: string;
    user_id: string;
    v_types: unknown | null;
  };
}

export interface BuffMarketSellOrderResponseData {
  fop_str: string;
  goods_infos: BuffMarketSellOrderGoodsInfo;
  has_market_stores: BuffMarketSellOrderMarketStores;
  items: BuffMarketSellOrderResponseItem[];
  page_num: number;
  page_size: number;
  preview_screenshots: unknown;
  show_game_cms_icon: boolean;
  show_pay_method_icon: boolean;
  sort_by: string;
  src_url_background: string;
  total_count: number;
  total_page: number;
  user_infos: BuffMarketSellOrderUserInfo;
}
