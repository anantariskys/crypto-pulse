import ScreenWrapper from "@/components/ui/screen-wrapper";
import Skeleton from "@/components/ui/skeleton";
import { useTrending } from "@/hooks/use-trending";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
    Image,
    Pressable,
    RefreshControl,
    ScrollView,
    Text,
    View,
} from "react-native";

export default function TrendingScreen() {
  const { data, isLoading, isError, refetch } = useTrending();

  return (
    <ScreenWrapper className="px-4">
      <View className="mb-4 pt-4">
        <Text className="text-white text-2xl font-bold">Trending</Text>
      </View>

      {isLoading && (
        <View className="gap-3">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} />
          ))}
        </View>
      )}

      {isError && (
        <Text className="text-danger">Failed to load trending coins.</Text>
      )}

      <ScrollView
        contentContainerStyle={{ paddingBottom: 20 }}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={refetch}
            tintColor="#135BEC"
          />
        }
      >
        <View className="gap-3">
          {data?.coins.map((c) => (
            <Pressable
              key={c.item.id}
              onPress={() =>
                router.push({
                  pathname: "/coin/[id]",
                  params: { id: c.item.id },
                })
              }
              className="flex-row items-center justify-between bg-surface rounded-xl p-4 border border-white/5"
            >
              <View className="flex-row items-center gap-4">
                <Text className="text-muted font-bold text-sm w-6">
                  #{c.item.market_cap_rank}
                </Text>
                <Image
                  source={{ uri: c.item.small }}
                  className="w-10 h-10 rounded-full"
                />
                <View>
                  <Text className="text-white font-bold text-base">
                    {c.item.name}
                  </Text>
                  <Text className="text-muted text-xs uppercase">
                    {c.item.symbol}
                  </Text>
                </View>
              </View>

              <View className="items-end">
                <MaterialIcons name="chevron-right" size={24} color="#9CA3AF" />
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}
