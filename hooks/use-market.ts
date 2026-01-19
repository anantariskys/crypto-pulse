import { getMarket } from "@/services/coingecko";
import { useQuery } from "@tanstack/react-query";

export const useMarket = () =>
  useQuery({
    queryKey: ["market"],
    queryFn: getMarket,
  });
