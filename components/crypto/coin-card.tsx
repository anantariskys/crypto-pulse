import { View, Text, Image, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Sparkline } from "../shared/sparkline";

export default function CoinCard({ coin }: any) {
  const up = coin.price_change_percentage_24h > 0;

  return (
    <Pressable
      onPress={() =>
        router.push({
          pathname: "/coin/[id]",
          params: { id: coin.id },
        })
      }
      className="w-full"
    >
      <View className="bg-surface px-4 py-3 rounded-xl flex-row items-center gap-3 border border-white/5">
        
        {/* LEFT: ICON + NAME */}
        <View className="flex-row flex-1 items-center gap-3">
          <View className="w-10 h-10 rounded-full bg-white/10 p-1.5">
            <Image
              source={{ uri: coin.image }}
              className="w-full h-full rounded-full"
            />
          </View>

          <View className="flex-1">
            <Text
              className="text-white font-semibold text-sm"
              numberOfLines={1}
            >
              {coin.name}
            </Text>
            <Text className="text-xs text-muted uppercase">
              {coin.symbol}
            </Text>
          </View>
        </View>

        {/* MIDDLE: SPARKLINE */}
        <View className="items-center justify-center">
          <Sparkline
            data={coin.sparkline_in_7d?.price?.slice(-20)}
            up={up}
          />
        </View>

        {/* RIGHT: PRICE */}
        <View className="items-end w-24">
          <Text className="text-white font-semibold text-sm">
            ${coin.current_price.toLocaleString()}
          </Text>

          <View className="flex-row items-center">
            <MaterialIcons
              name={up ? "arrow-drop-up" : "arrow-drop-down"}
              size={18}
              color={up ? "#22C55E" : "#EF4444"}
            />
            <Text
              className={`text-xs font-medium ${
                up ? "text-success" : "text-danger"
              }`}
            >
              {coin.price_change_percentage_24h.toFixed(2)}%
            </Text>
          </View>
        </View>

      </View>
    </Pressable>
  );
}
