import AIInsight from "@/components/crypto/ai-insight";
import CoinCard from "@/components/crypto/coin-card";
import Header from "@/components/layout/header";
import SearchBar from "@/components/shared/search-bar";
import Skeleton from "@/components/ui/skeleton";
import { useMarket } from "@/hooks/use-market";
import { Link } from "expo-router";
import { ScrollView, View, Text } from "react-native";

export default function MarketScreen() {
  const { data, isLoading } = useMarket();

  return (
    <ScrollView className="flex-1 bg-bg px-4">
      <Header />
      <SearchBar />
      <AIInsight />
      <View className="flex-row items-end justify-between mb-4">
        <Text className="text-white text-2xl font-bold ">Crypto Market</Text>

        <Link href={{ pathname: "/(tabs)" }} className="text-primary text-sm font-bold">See All</Link>
      </View>

      {isLoading &&
        Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} />)}
      <View className="flex-col gap-2 mb-4">
        {data?.map((coin: any) => (
          <CoinCard key={coin.id} coin={coin} />
        ))}
      </View>
    </ScrollView>
  );
}
