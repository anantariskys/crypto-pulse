import { useQuery } from "@tanstack/react-query";
import { getSimplePrice } from "@/services/coingecko.service";
import type { SimplePrice } from "@/types/coingecko";

export function useSimplePrice(ids: string[], vs: string[] = ["usd"]) {
  return useQuery<SimplePrice, Error>({
    queryKey: ["simple_price", ids.sort().join(","), vs.sort().join(",")],
    queryFn: () => getSimplePrice(ids, vs),
    enabled: ids.length > 0,
    staleTime: 30_000,
    refetchInterval: 30_000,
  });
}

