import ScreenWrapper from "@/components/ui/screen-wrapper";
import { useSearchCoins } from "@/hooks/use-search-coins";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";

export default function SearchScreen() {
  const [input, setInput] = useState("");
  const [query, setQuery] = useState("");
  const { data, isLoading, isError } = useSearchCoins(query);

  useEffect(() => {
    const t = setTimeout(() => setQuery(input.trim()), 300);
    return () => clearTimeout(t);
  }, [input]);

  return (
    <ScreenWrapper>
      <ScrollView className="flex-1 px-4">
        <View className="flex-row items-center gap-3 mb-4">
          <Pressable
            onPress={() => router.back()}
            className="w-10 h-10 items-center justify-center rounded-full bg-surface border border-white/5"
          >
            <MaterialIcons name="arrow-back" size={24} color="white" />
          </Pressable>
          <View className="flex-1 flex-row items-center bg-surface rounded-xl h-12 px-4 border border-white/5">
            <TextInput
              placeholder="Search coin..."
              placeholderTextColor="#9CA3AF"
              className="flex-1 text-white"
              value={input}
              onChangeText={setInput}
              autoFocus
            />
          </View>
        </View>

        {isLoading && <Text className="text-muted text-center mt-4">Searching...</Text>}
        {isError && <Text className="text-danger text-center mt-4">Failed to search</Text>}

      <View className="flex-col gap-2">
        {data?.coins.map((c) => (
          <Pressable
            key={c.id}
            onPress={() =>
              router.push({ pathname: "/coin/[id]", params: { id: c.id } })
            }
            className="flex-row items-center gap-3 bg-surface rounded-xl px-3 py-2 border border-white/5"
          >
            <Image source={{ uri: c.thumb }} className="w-8 h-8 rounded-full" />
            <View className="flex-1">
              <Text className="text-white font-semibold text-sm">
                {highlight(c.name, query)}
              </Text>
              <Text className="text-muted text-xs uppercase">{c.symbol}</Text>
            </View>
          </Pressable>
        ))}
        {query && !data?.coins.length && (
          <Text className="text-muted">No results</Text>
        )}
      </View>
    </ScrollView>
    </ScreenWrapper>
  );
}

function highlight(text: string, q: string) {
  if (!q) return text;
  const idx = text.toLowerCase().indexOf(q.toLowerCase());
  if (idx === -1) return text;
  return (
    <>
      <Text className="text-white">{text.slice(0, idx)}</Text>
      <Text className="text-primary">{text.slice(idx, idx + q.length)}</Text>
      <Text className="text-white">{text.slice(idx + q.length)}</Text>
    </>
  );
}
