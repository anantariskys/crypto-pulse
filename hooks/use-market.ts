import { getMarkets } from "@/services/coingecko.service";
import { useQuery } from "@tanstack/react-query";
import type { MarketCoin } from "@/types/coingecko";

export const useMarket = () =>
  useQuery<MarketCoin[]>({
    queryKey: ["market", { per_page: 8 }],
    queryFn: () => getMarkets({ per_page: 8 }),
    staleTime: 60_000,
  });
