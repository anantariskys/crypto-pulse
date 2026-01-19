import { useQuery } from "@tanstack/react-query";
import { getCoin } from "@/services/coingecko";



export const useCoin = (id: string) =>
  useQuery({
    queryKey: ["coin", id],
    queryFn: () => getCoin(id),
  });
