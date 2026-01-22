import { queryClient } from "@/lib/query-client";
import { useQuery } from "@tanstack/react-query";

const KEY = "watchlist_ids";
let memory: string[] = [];
let storage: any;
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  storage = require("@react-native-async-storage/async-storage");
} catch {
  storage = null;
}

export function useWatchlist() {
  return useQuery<string[]>({
    queryKey: [KEY],
    queryFn: async () => {
      if (storage?.default) {
        const raw = await storage.default.getItem(KEY);
        memory = raw ? JSON.parse(raw) : [];
      }
      return memory;
    },
    staleTime: Infinity,
  });
}

export function addToWatchlist(id: string) {
  memory = Array.from(new Set([...memory, id]));
  queryClient.setQueryData([KEY], memory);
  if (storage?.default) {
    storage.default.setItem(KEY, JSON.stringify(memory));
  }
}

export function removeFromWatchlist(id: string) {
  memory = memory.filter((x) => x !== id);
  queryClient.setQueryData([KEY], memory);
  if (storage?.default) {
    storage.default.setItem(KEY, JSON.stringify(memory));
  }
}
