import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/services/coingecko.service";
import type { Category } from "@/types/coingecko";

export function useCategories() {
  return useQuery<Category[], Error>({
    queryKey: ["categories"],
    queryFn: getCategories,
    staleTime: 10 * 60_000,
 
  });
}

