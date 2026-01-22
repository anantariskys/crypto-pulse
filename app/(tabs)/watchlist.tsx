import ScreenWrapper from "@/components/ui/screen-wrapper";
import { useSimplePrice } from "@/hooks/use-simple-price";
import {
    addToWatchlist,
    removeFromWatchlist,
    useWatchlist,
} from "@/hooks/use-watchlist";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
    Pressable,
    RefreshControl,
    ScrollView,
    Text,
    TextInput,
    View,
} from "react-native";

export default function WatchlistScreen() {
  const wl = useWatchlist();
  const prices = useSimplePrice(wl.data || []);
  const [idInput, setIdInput] = useState("");

  const handleAdd = () => {
    if (idInput.trim()) {
      addToWatchlist(idInput.trim().toLowerCase());
      setIdInput("");
    }
  };

  return (
    <ScreenWrapper className="px-4">
      <View className="mb-4 pt-4">
        <Text className="text-white text-2xl font-bold">Watchlist</Text>
      </View>

      <View className="flex-row items-center bg-surface rounded-xl h-12 px-4 mb-6 border border-white/5">
        <TextInput
          placeholder="Add coin id (e.g., bitcoin)"
          placeholderTextColor="#9CA3AF"
          className="flex-1 text-white"
          value={idInput}
          onChangeText={setIdInput}
          onSubmitEditing={handleAdd}
        />
        <Pressable onPress={handleAdd} className="p-2 bg-primary/20 rounded-lg">
          <MaterialIcons name="add" size={20} color="#135BEC" />
        </Pressable>
      </View>

      <ScrollView
        contentContainerStyle={{ paddingBottom: 20 }}
        refreshControl={
          <RefreshControl
            refreshing={prices.isRefetching}
            onRefresh={prices.refetch}
            tintColor="#135BEC"
          />
        }
      >
        {!wl.data?.length ? (
          <View className="items-center justify-center py-20 opacity-50">
            <MaterialIcons name="star-border" size={64} color="#9CA3AF" />
            <Text className="text-muted mt-4 text-center">
              Your watchlist is empty.
            </Text>
            <Text className="text-muted text-xs text-center">
              Add coins to track their prices.
            </Text>
          </View>
        ) : (
          <View className="gap-3">
            {wl.data.map((id) => {
              const data = prices.data?.[id];
              const price = data?.usd;
              const change = data?.usd_24h_change ?? 0;
              const up = change >= 0;

              return (
                <Pressable
                  key={id}
                  onPress={() =>
                    router.push({ pathname: "/coin/[id]", params: { id } })
                  }
                  className="flex-row items-center justify-between bg-surface rounded-xl p-4 border border-white/5"
                >
                  <View className="flex-row items-center gap-3 flex-1">
                    <View className="w-10 h-10 rounded-full bg-white/10 items-center justify-center">
                      <Text className="text-white font-bold text-lg">
                        {id.charAt(0).toUpperCase()}
                      </Text>
                    </View>
                    <View>
                      <Text className="text-white font-bold capitalize">
                        {id}
                      </Text>
                    </View>
                  </View>

                  <View className="items-end mr-3">
                    <Text className="text-white font-bold">
                      ${price?.toLocaleString() ?? "..."}
                    </Text>
                    <View className="flex-row items-center">
                      <MaterialIcons
                        name={up ? "arrow-drop-up" : "arrow-drop-down"}
                        size={16}
                        color={up ? "#22C55E" : "#EF4444"}
                      />
                      <Text
                        className={`text-xs font-bold ${up ? "text-success" : "text-danger"}`}
                      >
                        {change.toFixed(2)}%
                      </Text>
                    </View>
                  </View>

                  <Pressable
                    onPress={(e) => {
                      e.stopPropagation();
                      removeFromWatchlist(id);
                    }}
                    className="p-2"
                  >
                    <MaterialIcons
                      name="delete-outline"
                      size={20}
                      color="#6B7280"
                    />
                  </Pressable>
                </Pressable>
              );
            })}
          </View>
        )}
      </ScrollView>
    </ScreenWrapper>
  );
}
