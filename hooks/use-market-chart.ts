import { useQuery } from "@tanstack/react-query";
import { getMarketChart } from "@/services/coingecko.service";
import type { MarketChart } from "@/types/coingecko";

export function useMarketChart(id: string, days: number | "1" | "7" | "30" | "365" = "7") {
  return useQuery<MarketChart, Error>({
    queryKey: ["market_chart", id, days],
    queryFn: () => getMarketChart(id, days),
    enabled: !!id,
    staleTime: 5 * 60_000,
  });
}

