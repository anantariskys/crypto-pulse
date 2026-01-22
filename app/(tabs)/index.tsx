import CoinCard from "@/components/crypto/coin-card";
import Header from "@/components/layout/header";
import ScreenWrapper from "@/components/ui/screen-wrapper";
import Skeleton from "@/components/ui/skeleton";
import { useMarkets } from "@/hooks/use-markets";
import { useTrending } from "@/hooks/use-trending";
import { queryClient } from "@/lib/query-client";
import { MaterialIcons } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import {
  Image,
  Pressable,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from "react-native";

export default function HomeScreen() {
  const trending = useTrending();
  const markets = useMarkets({ per_page: 10 });

  const refreshing = trending.isFetching || markets.isFetching;

  const onRefresh = () => {
    queryClient.invalidateQueries({ queryKey: ["trending"] });
    queryClient.invalidateQueries({ queryKey: ["markets"] });
  };

  return (
    <ScreenWrapper>
      <ScrollView
        className="flex-1 px-4"
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#135BEC"
          />
        }
      >
        <Header />

        {/* Search Bar Entry */}
        <Pressable
          onPress={() => router.push("/search")}
          className="flex-row items-center bg-surface rounded-xl h-12 px-4 mb-6 border border-white/5"
        >
          <MaterialIcons name="search" size={20} color="#9CA3AF" />
          <Text className="ml-3 text-muted">Search coins...</Text>
        </Pressable>

        {/* Trending Section */}
        <View className="mb-6">
          <View className="flex-row items-end justify-between mb-3">
            <Text className="text-white text-lg font-bold">Trending 🔥</Text>
            <Link
              href="/(tabs)/trending"
              className="text-primary text-sm font-bold"
            >
              See All
            </Link>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 12 }}
          >
            {trending.isLoading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <View
                    key={i}
                    className="w-32 h-32 bg-surface rounded-xl p-3 justify-between"
                  >
                    <View className="w-8 h-8 rounded-full bg-white/5 mb-2" />
                    <View className="w-20 h-4 bg-white/5 rounded" />
                    <View className="w-16 h-4 bg-white/5 rounded" />
                  </View>
                ))
              : trending.data?.coins.slice(0, 10).map((c) => (
                  <Pressable
                    key={c.item.id}
                    onPress={() =>
                      router.push({
                        pathname: "/coin/[id]",
                        params: { id: c.item.id },
                      })
                    }
                    className="w-32 bg-surface rounded-xl p-3 border border-white/5"
                  >
                    <Image
                      source={{ uri: c.item.small }}
                      className="w-8 h-8 rounded-full mb-3"
                    />
                    <Text
                      className="text-white font-bold text-sm mb-1"
                      numberOfLines={1}
                    >
                      {c.item.symbol}
                    </Text>
                    <Text className="text-muted text-xs" numberOfLines={1}>
                      {c.item.name}
                    </Text>
                    <View className="mt-2 bg-white/5 px-2 py-1 rounded self-start">
                      <Text className="text-white text-xs">
                        #{c.item.market_cap_rank}
                      </Text>
                    </View>
                  </Pressable>
                ))}
          </ScrollView>
        </View>

        {/* Market Section */}
        <View className="mb-4">
          <View className="flex-row items-end justify-between mb-3">
            <Text className="text-white text-lg font-bold">Top Market</Text>
            <Link
              href="/(tabs)/market"
              className="text-primary text-sm font-bold"
            >
              See All
            </Link>
          </View>

          <View className="gap-2">
            {markets.isLoading &&
              Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={`m-${i}`} />
              ))}
            {markets.data?.pages?.[0]?.map((coin) => (
              <CoinCard key={coin.id} coin={coin} />
            ))}
          </View>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}
