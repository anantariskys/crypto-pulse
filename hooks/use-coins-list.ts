import { useQuery } from "@tanstack/react-query";
import { getCoinsList } from "@/services/coingecko.service";
import type { CoinListItem } from "@/types/coingecko";

export function useCoinsList() {
  return useQuery<CoinListItem[], Error>({
    queryKey: ["coins_list"],
    queryFn: getCoinsList,
    staleTime: 24 * 60 * 60_000,

  });
}

