import {
  View,
  Text,
  ScrollView,
  Image,
  Pressable,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { useCoin } from "@/hooks/use-coin";
import Svg, { Path } from "react-native-svg";
import { useMemo, useState } from "react";

/* ================= SVG HELPER ================= */

function generatePath(
  data: number[],
  width = 320,
  height = 160
) {
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

/* ================= SCREEN ================= */

export default function CoinDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { data, isLoading } = useCoin(id);
  const [timeframe, setTimeframe] =
    useState<"1D" | "7D" | "1M">("7D");

  if (isLoading || !data) {
    return (
      <View className="flex-1 bg-bg items-center justify-center">
        <Text className="text-muted">Loading...</Text>
      </View>
    );
  }

  const price = data.market_data.current_price.usd;
  const change = data.market_data.price_change_percentage_24h;
  const up = change >= 0;

  /* ================= CHART DATA ================= */

  const chartData = useMemo(() => {
    const prices = data.market_data.sparkline_7d?.price ?? [];
    if (timeframe === "1D") return prices.slice(-24);
    if (timeframe === "1M") return prices.slice(-30 * 24);
    return prices;
  }, [timeframe, data]);

  return (
    <View className="flex-1 bg-bg">
      {/* ================= NAVBAR ================= */}
      <View className="flex-row items-center justify-between px-4 py-3 border-b border-white/5">
        <Pressable
          onPress={() => router.back()}
          className="w-10 h-10 rounded-full items-center justify-center"
        >
          <MaterialIcons
            name="arrow-back-ios-new"
            size={18}
            color="white"
          />
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
              <Image
                source={{ uri: data.image.large }}
                className="w-10 h-10"
              />
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
            {(["1D", "7D", "1M"] as const).map((t) => (
              <Pressable
                key={t}
                onPress={() => setTimeframe(t)}
                className={`flex-1 py-2 rounded-lg items-center ${
                  timeframe === t ? "bg-bg" : ""
                }`}
              >
                <Text
                  className={`text-sm font-semibold ${
                    timeframe === t
                      ? "text-primary"
                      : "text-muted"
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
          <Text className="text-muted text-xs font-bold mb-3 tracking-widest">
            MARKET STATS
          </Text>

          <View className="flex-row gap-4">
            <View className="flex-1 bg-white/5 rounded-2xl p-4">
              <Text className="text-muted text-xs mb-1">
                Market Cap
              </Text>
              <Text className="text-white text-xl font-bold">
                ${(data.market_data.market_cap.usd / 1e12).toFixed(2)}T
              </Text>
            </View>

            <View className="flex-1 bg-white/5 rounded-2xl p-4">
              <Text className="text-muted text-xs mb-1">
                24h Volume
              </Text>
              <Text className="text-white text-xl font-bold">
                ${(data.market_data.total_volume.usd / 1e9).toFixed(2)}B
              </Text>
            </View>
          </View>
        </View>

        {/* ================= AI INSIGHT ================= */}
        <View className="px-4 mb-6">
          <View className="bg-primary/10 border border-primary/20 rounded-2xl p-5">
            <View className="flex-row items-center gap-2 mb-2">
              <MaterialIcons
                name="auto-awesome"
                size={18}
                color="#135bec"
              />
              <Text className="text-primary font-bold">
                CryptoPulse AI Insight
              </Text>
            </View>

            <Text className="text-muted leading-relaxed">
              {data.name} shows strong bullish momentum. Support is forming
              near{" "}
              <Text className="text-white font-bold">
                ${price.toLocaleString()}
              </Text>
              . AI identifies a potential upside continuation if volume
              sustains.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
