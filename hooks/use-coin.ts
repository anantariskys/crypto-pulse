import { useQuery } from "@tanstack/react-query";
import { getCoinDetail } from "@/services/coingecko.service";
import type { CoinDetail } from "@/types/coingecko";



export const useCoin = (id: string) =>
  useQuery<CoinDetail>({
    queryKey: ["coin", id],
    queryFn: () => getCoinDetail(id),
    enabled: !!id,
    staleTime: 60_000,
  });
