import CoinCard from "@/components/crypto/coin-card";
import Header from "@/components/layout/header";
import ScreenWrapper from "@/components/ui/screen-wrapper";
import Skeleton from "@/components/ui/skeleton";
import { useCategories } from "@/hooks/use-categories";
import { useMarkets } from "@/hooks/use-markets";
import { MaterialIcons } from "@expo/vector-icons";
import { useMemo, useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    Pressable,
    RefreshControl,
    ScrollView,
    Text,
    View,
} from "react-native";

type SortKey =
  | "market_cap_desc"
  | "market_cap_asc"
  | "volume_desc"
  | "volume_asc"
  | "id_asc"
  | "id_desc";

export default function MarketScreen() {
  const categories = useCategories();
  const [sort, setSort] = useState<SortKey>("market_cap_desc");
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    undefined,
  );

  const markets = useMarkets({
    order: sort,
    category: selectedCategory,
    per_page: 20,
  });

  const data = useMemo(() => markets.data?.pages.flat() ?? [], [markets.data]);

  const renderHeader = () => (
    <>
      <Header />
      <View className="mb-4">
        <Text className="text-white text-2xl font-bold">Market</Text>
      </View>

      {/* Sort Options */}
      <View className="mb-4">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 8 }}
        >
          {(["market_cap_desc", "volume_desc", "id_asc"] as SortKey[]).map(
            (s) => (
              <Pressable
                key={s}
                onPress={() => setSort(s)}
                className={`flex-row items-center gap-1 px-3 py-2 rounded-full border ${
                  sort === s
                    ? "bg-primary/20 border-primary"
                    : "bg-surface border-white/5"
                }`}
              >
                <Text
                  className={`${sort === s ? "text-primary" : "text-muted"} text-xs font-semibold`}
                >
                  {s.includes("market_cap")
                    ? "Market Cap"
                    : s.includes("volume")
                      ? "Volume"
                      : "Name"}
                </Text>
                {sort === s && (
                  <MaterialIcons name="check" size={14} color="#135BEC" />
                )}
              </Pressable>
            ),
          )}
        </ScrollView>
      </View>

      {/* Categories */}
      <View className="mb-4">
        <Text className="text-muted text-xs font-bold mb-2 tracking-widest uppercase">
          Categories
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 8 }}
        >
          <Pressable
            onPress={() => setSelectedCategory(undefined)}
            className={`px-3 py-2 rounded-full border ${!selectedCategory ? "bg-primary/20 border-primary" : "bg-surface border-white/5"}`}
          >
            <Text
              className={`${!selectedCategory ? "text-primary" : "text-muted"} text-xs font-semibold`}
            >
              All
            </Text>
          </Pressable>
          {categories.data?.slice(0, 12).map((cat) => (
            <Pressable
              key={cat.id}
              onPress={() => setSelectedCategory(cat.id)}
              className={`px-3 py-2 rounded-full border ${selectedCategory === cat.id ? "bg-primary/20 border-primary" : "bg-surface border-white/5"}`}
            >
              <Text
                className={`${selectedCategory === cat.id ? "text-primary" : "text-muted"} text-xs font-semibold`}
              >
                {cat.name}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      {markets.isLoading &&
        Array.from({ length: 8 }).map((_, i) => <Skeleton key={`sk-${i}`} />)}
    </>
  );

  return (
    <ScreenWrapper className="px-4">
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <CoinCard coin={item} />}
        onEndReachedThreshold={0.5}
        onEndReached={() => {
          if (markets.hasNextPage) markets.fetchNextPage();
        }}
        refreshControl={
          <RefreshControl
            refreshing={markets.isRefetching}
            onRefresh={markets.refetch}
            tintColor="#135BEC"
          />
        }
        ListHeaderComponent={renderHeader}
        ListFooterComponent={
          <View className="py-6 items-center">
            {markets.isFetchingNextPage && (
              <ActivityIndicator color="#135BEC" />
            )}
            {!markets.hasNextPage && data.length > 0 && (
              <Text className="text-muted text-xs">No more coins</Text>
            )}
          </View>
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
        ItemSeparatorComponent={() => <View className="h-2" />}
      />
    </ScreenWrapper>
  );
}
