import { View, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function AIInsight() {
  return (
    <View className="bg-primary/10 border border-primary/20 mb-4 p-4 rounded-xl">
      <View className="flex-row items-center gap-2 mb-2">
        <MaterialIcons name="auto-awesome" size={16} color="#135BEC" />
        <Text className="text-primary text-xs font-bold">
          AI INSIGHT
        </Text>
      </View>
      <Text className="text-white text-sm">
        SOL showing bullish divergence on 4H chart.
        Predicted +4.2% in the next 12h.
      </Text>
    </View>
  );
}
