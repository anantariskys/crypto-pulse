import { useInfiniteQuery } from "@tanstack/react-query";
import { getMarkets, MarketsParams } from "@/services/coingecko.service";
import type { MarketCoin } from "@/types/coingecko";

export function useMarkets(params: Omit<MarketsParams, "page"> = {}) {
  return useInfiniteQuery<MarketCoin[], Error>({
    queryKey: ["markets", params],
    queryFn: ({ pageParam = 1 }) =>
      getMarkets({ ...params, page: pageParam as number, per_page: params.per_page ?? 20 }),
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length > 0 ? allPages.length + 1 : undefined,
    staleTime: 30_000,
  });
}

