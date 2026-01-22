import { useQuery } from "@tanstack/react-query";
import { getOHLC } from "@/services/coingecko.service";
import type { OHLCItem } from "@/types/coingecko";

export function useOHLC(id: string, days: 1 | 7 | 30 | 365 = 7) {
  return useQuery<OHLCItem[], Error>({
    queryKey: ["ohlc", id, days],
    queryFn: () => getOHLC(id, days),
    enabled: !!id,
    staleTime: 5 * 60_000,
  });
}

