import { View, Text, ScrollView } from "react-native";

export default function AIPrediction() {
  return (
    <ScrollView className="flex-1 bg-bg px-4 pt-12">
      <View className="bg-card rounded-xl p-5">
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
  );
}
