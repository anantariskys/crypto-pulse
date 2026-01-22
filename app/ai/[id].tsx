import ScreenWrapper from "@/components/ui/screen-wrapper";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";

export default function AIPrediction() {
  return (
    <ScreenWrapper>
      <ScrollView className="flex-1 px-4">
        <Pressable
          onPress={() => router.back()}
          className="w-10 h-10 items-center justify-center rounded-full bg-surface border border-white/5 mb-4"
        >
          <MaterialIcons name="arrow-back" size={24} color="white" />
        </Pressable>

        <View className="bg-card rounded-xl p-5 border border-white/5">
          <Text className="text-white text-xl font-bold mb-2">
            AI Price Prediction
          </Text>

          <Text className="text-success text-lg font-semibold">
            Bullish Trend
          </Text>

          <Text className="text-muted mt-2">
            Predicted range (24h):
          </Text>
          <Text className="text-white font-bold text-lg">
            $67,000 – $69,000
          </Text>

          <Text className="text-muted mt-4 text-xs">
            This prediction is experimental and generated using machine learning.
            It is not financial advice.
          </Text>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}
