import { http } from "@/lib/axios";
import {
  MarketCoin,
  CoinDetail,
  MarketChart,
  OHLCItem,
  SearchResponse,
  TrendingResponse,
  Category,
  SimplePrice,
  CoinListItem,
} from "@/types/coingecko";

export type MarketsParams = {
  vs_currency?: string;
  order?: "market_cap_desc" | "market_cap_asc" | "volume_desc" | "volume_asc" | "id_asc" | "id_desc";
  per_page?: number;
  page?: number;
  sparkline?: boolean;
  price_change_percentage?: "1h,24h,7d,30d,1y" | string;
  category?: string;
  ids?: string;
};

export async function getMarkets(params: MarketsParams = {}): Promise<MarketCoin[]> {
  const { data } = await http.get<MarketCoin[]>("/coins/markets", {
    params: {
      vs_currency: "usd",
      order: "market_cap_desc",
      per_page: 20,
      page: 1,
      sparkline: true,
      ...params,
    },
  });
  return data;
}

export async function getCoinDetail(id: string): Promise<CoinDetail> {
  const { data } = await http.get<CoinDetail>(`/coins/${id}`, {
    params: {
      localization: false,
      tickers: false,
      market_data: true,
      community_data: true,
      developer_data: true,
      sparkline: true,
    },
  });
  return data;
}

export async function getMarketChart(id: string, days: number | "1" | "7" | "30" | "365"): Promise<MarketChart> {
  const { data } = await http.get<MarketChart>(`/coins/${id}/market_chart`, {
    params: {
      vs_currency: "usd",
      days,
    },
  });
  return data;
}

export async function getOHLC(
  id: string,
  days: 1 | 7 | 30 | 365,
  vs_currency: "usd" | "eur" | "btc" = "usd"
): Promise<OHLCItem[]> {
  const { data } = await http.get<OHLCItem[]>(`/coins/${id}/ohlc`, {
    params: { vs_currency, days },
  });
  return data;
}

export async function searchCoins(query: string): Promise<SearchResponse> {
  const { data } = await http.get<SearchResponse>("/search", {
    params: { query },
  });
  return data;
}

export async function getTrending(): Promise<TrendingResponse> {
  const { data } = await http.get<TrendingResponse>("/search/trending");
  return data;
}

export async function getCategories(): Promise<Category[]> {
  const { data } = await http.get<Category[]>("/coins/categories");
  return data;
}

export async function getSimplePrice(
  ids: string[],
  vs_currencies: string[] = ["usd"],
  include_24hr_change = true
): Promise<SimplePrice> {
  const { data } = await http.get<SimplePrice>("/simple/price", {
    params: {
      ids: ids.join(","),
      vs_currencies: vs_currencies.join(","),
      include_24hr_change,
    },
  });
  return data;
}

export async function getCoinsList(): Promise<CoinListItem[]> {
  const { data } = await http.get<CoinListItem[]>("/coins/list");
  return data;
}

