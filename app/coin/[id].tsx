import { useCoin } from "@/hooks/use-coin";
import { useMarketChart } from "@/hooks/use-market-chart";
import { useOHLC } from "@/hooks/use-ohlc";
import { MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import Svg, { Path } from "react-native-svg";
import ScreenWrapper from "@/components/ui/screen-wrapper";

/* ================= SVG HELPER ================= */

function generatePath(data: number[], width = 320, height = 160) {
  if (!data || data.length === 0) return "";

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  return data
    .map((p, i) => {
      const x = (i / (data.length - 1)) * width;
      const y = height - ((p - min) / range) * height;
      return `${i === 0 ? "M" : "L"} ${x} ${y}`;
    })
    .join(" ");
}

/* ================= COMPONENT ================= */
const StatCard = ({ label, value }: { label: string; value: string }) => (
  <View className="bg-surface p-3 rounded-xl border border-white/5 flex-1 min-w-[45%]">
    <Text className="text-muted text-xs font-bold mb-1">{label}</Text>
    <Text className="text-white font-semibold text-sm">{value}</Text>
  </View>
);

export default function CoinDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { data, isLoading, isError } = useCoin(id);
  const [timeframe, setTimeframe] = useState<"1D" | "7D" | "30D" | "1Y">("7D");
  const chart = useMarketChart(
    id,
    timeframe === "1D"
      ? "1"
      : timeframe === "7D"
        ? "7"
        : timeframe === "30D"
          ? "30"
          : "365",
  );
  
  // ohlc is not used in UI currently but we keep it if needed later or remove.
  // The previous file had OHLC section but it was hidden/commented out or just separate.
  // I will skip OHLC for now to keep it clean as per "Stats Grid" requirement, unless user wants it.
  // Actually, previous file had OHLC section. I'll keep it if it fits, but the user asked for "Market stats grid".
  // I replaced OHLC with Market Stats Grid effectively. I'll stick to that.

  const chartData = useMemo(() => {
    const prices = chart.data?.prices?.map((p) => p[1]) ?? [];
    return prices;
  }, [chart.data]);

  if (isLoading || !data) {
    return (
      <ScreenWrapper className="items-center justify-center">
        <Text className="text-muted">Loading...</Text>
      </ScreenWrapper>
    );
  }
  if (isError) {
    return (
      <ScreenWrapper className="items-center justify-center">
        <Text className="text-danger">Failed to load coin</Text>
      </ScreenWrapper>
    );
  }

  const price = data.market_data.current_price.usd;
  const change = data.market_data.price_change_percentage_24h;
  const up = change >= 0;

  return (
    <ScreenWrapper>
      {/* ================= NAVBAR ================= */}
      <View className="flex-row items-center justify-between px-4 py-3 border-b border-white/5">
        <Pressable
          onPress={() => router.back()}
          className="w-10 h-10 rounded-full items-center justify-center bg-white/5"
        >
          <MaterialIcons name="arrow-back-ios-new" size={18} color="white" />
        </Pressable>

        <View className="items-center">
          <Text className="text-primary text-xs font-bold tracking-widest">
            CRYPTOPULSE AI
          </Text>
          <Text className="text-white text-sm font-bold">
            {data.name} ({data.symbol.toUpperCase()})
          </Text>
        </View>

        <View className="w-10 h-10" />
      </View>

      <ScrollView className="pb-32">
        {/* ================= HEADER ================= */}
        <View className="px-6 pt-6">
          <View className="flex-row items-center gap-4 mb-6">
            <View className="relative w-16 h-16 rounded-full bg-primary items-center justify-center">
              <Image source={{ uri: data.image.large }} className="w-10 h-10" />
              <View className="absolute -bottom-1 -right-1 w-6 h-6 bg-primary rounded-full items-center justify-center border border-bg">
                <MaterialIcons name="bolt" size={14} color="white" />
              </View>
            </View>

            <View>
              <View className="flex-row items-center gap-2">
                <Text className="text-white text-2xl font-bold">
                  {data.name}
                </Text>
                <Text className="text-muted font-medium">
                  {data.symbol.toUpperCase()}
                </Text>
              </View>

              <View className="flex-row gap-2 mt-1">
                <Text className="px-2 py-0.5 text-[10px] font-bold bg-white/10 text-muted rounded">
                  Rank #{data.market_cap_rank}
                </Text>
                <Text className="px-2 py-0.5 text-[10px] font-bold bg-primary/10 text-primary rounded">
                  AI Prediction: Bullish
                </Text>
              </View>
            </View>
          </View>

          {/* ================= PRICE ================= */}
          <View className="mb-6">
            <Text className="text-white text-4xl font-bold">
              ${price.toLocaleString()}
            </Text>

            <View className="flex-row items-center gap-2 mt-1">
              <MaterialIcons
                name={up ? "trending-up" : "trending-down"}
                size={18}
                color={up ? "#0BDA5E" : "#EF4444"}
              />
              <Text
                className={`font-semibold ${
                  up ? "text-success" : "text-danger"
                }`}
              >
                {change.toFixed(2)}%
              </Text>
              <Text className="text-muted text-sm">today</Text>
            </View>
          </View>
        </View>

        {/* ================= TIMEFRAME ================= */}
        <View className="px-4 mb-4">
          <View className="flex-row bg-white/5 rounded-xl p-1">
            {(["1D", "7D", "30D", "1Y"] as const).map((t) => (
              <Pressable
                key={t}
                onPress={() => setTimeframe(t)}
                className={`flex-1 py-2 rounded-lg items-center ${
                  timeframe === t ? "bg-bg" : ""
                }`}
              >
                <Text
                  className={`text-sm font-semibold ${
                    timeframe === t ? "text-primary" : "text-muted"
                  }`}
                >
                  {t}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* ================= CHART ================= */}
        <View className="px-4 mb-6">
          <View className="h-64 bg-white/5 rounded-xl p-4">
            <Svg width="100%" height="100%" viewBox="0 0 320 160">
              <Path
                d={generatePath(chartData)}
                stroke="#135bec"
                strokeWidth={3}
                fill="none"
              />
            </Svg>
          </View>
        </View>

        {/* ================= MARKET STATS ================= */}
        <View className="px-4 mb-6">
          <Text className="text-muted text-xs font-bold mb-3 tracking-widest uppercase">
            Market Stats
          </Text>

          <View className="flex-row flex-wrap gap-3">
             <StatCard label="Market Cap" value={`$${(data.market_data.market_cap.usd / 1e9).toFixed(2)}B`} />
             <StatCard label="Volume (24h)" value={`$${(data.market_data.total_volume.usd / 1e9).toFixed(2)}B`} />
             <StatCard label="Low (24h)" value={`$${(data.market_data.low_24h?.usd ?? 0 / 1e6).toFixed(2)}M ${data.symbol.toUpperCase()}`} />
             <StatCard label="All Time High" value={`$${data.market_data.high_24h?.usd?.toLocaleString() || "N/A"} (${data.market_data.price_change_percentage_24h?.toFixed(2) || "N/A"}%)`} />
          </View>
        </View>

        {/* ================= AI INSIGHT ================= */}
        <View className="px-4 mb-6">
          <View className="bg-primary/10 border border-primary/20 rounded-2xl p-5">
            <View className="flex-row items-center gap-2 mb-2">
              <MaterialIcons name="auto-awesome" size={18} color="#135bec" />
              <Text className="text-primary font-bold">
                CryptoPulse AI Insight
              </Text>
            </View>

            <Text className="text-muted leading-relaxed">
              {data.name} shows strong bullish momentum. Support is forming near{" "}
              <Text className="text-white font-bold">
                ${price.toLocaleString()}
              </Text>
              . AI identifies a potential upside continuation if volume
              sustains.
            </Text>
          </View>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}
