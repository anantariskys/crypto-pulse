import { useQuery } from "@tanstack/react-query";
import { searchCoins } from "@/services/coingecko.service";
import type { SearchResponse } from "@/types/coingecko";

export function useSearchCoins(query: string) {
  return useQuery<SearchResponse, Error>({
    queryKey: ["search", query],
    queryFn: () => searchCoins(query),
    enabled: query.trim().length > 0,
    staleTime: 10_000,
  });
}

