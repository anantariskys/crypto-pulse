
import { getTrending } from "@/services/coingecko.service";
import type { TrendingResponse } from "@/types/coingecko";
import { useQuery } from "@tanstack/react-query";



export function useTrending() {
  return useQuery<TrendingResponse>({
    queryFn: () => getTrending(),
    queryKey: ["trending"],
    staleTime: 60_000,
  });
}


