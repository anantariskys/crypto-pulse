export type MarketCoin = {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number | null;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number | null;
  max_supply: number | null;
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  roi?: {
    times: number;
    currency: string;
    percentage: number;
  } | null;
  last_updated: string;
  sparkline_in_7d?: {
    price: number[];
  };
};

export type CoinDetail = {
  id: string;
  symbol: string;
  name: string;
  description?: {
    en?: string;
    [lang: string]: string | undefined;
  };
  image: {
    thumb: string;
    small: string;
    large: string;
  };
  links?: {
    homepage?: string[];
    blockchain_site?: string[];
    official_forum_url?: string[];
    chat_url?: string[];
    twitter_screen_name?: string | null;
    facebook_username?: string | null;
    subreddit_url?: string | null;
  };
  market_cap_rank?: number;
  market_data: {
    current_price: Record<string, number>;
    market_cap: Record<string, number>;
    total_volume: Record<string, number>;
    high_24h?: Record<string, number>;
    low_24h?: Record<string, number>;
    price_change_percentage_24h: number;
    sparkline_7d?: {
      price: number[];
    };
  };
};

export type MarketChart = {
  prices: [number, number][];
  market_caps: [number, number][];
  total_volumes: [number, number][];
};

export type OHLCItem = [number, number, number, number, number];

export type SearchCoin = {
  id: string;
  name: string;
  api_symbol: string;
  symbol: string;
  market_cap_rank: number | null;
  thumb: string;
  large: string;
};
export type SearchResponse = {
  coins: SearchCoin[];
};

export type TrendingItem = {
  item: {
    id: string;
    coin_id: number;
    name: string;
    symbol: string;
    market_cap_rank: number;
    thumb: string;
    small: string;
    large: string;
    slug: string;
    price_btc: number;
    score: number;
  };
};
export type TrendingResponse = {
  coins: TrendingItem[];
};

export type Category = {
  id: string;
  name: string;
  market_cap?: number;
  market_cap_change_24h?: number;
  volume_24h?: number;
};

export type SimplePrice = Record<
  string,
  {
    usd?: number;
    usd_24h_change?: number;
    [k: string]: number | undefined;
  }
>;

export type CoinListItem = {
  id: string;
  symbol: string;
  name: string;
};

