import { View } from "react-native";

export default function Skeleton() {
  return (
    <View className="flex-row items-center gap-4 bg-surface rounded-xl p-4 mb-3 border border-white/5">
      <View className="w-10 h-10 rounded-full bg-white/5" />
      <View className="flex-1 gap-2">
        <View className="h-4 w-32 bg-white/5 rounded" />
        <View className="h-3 w-20 bg-white/5 rounded" />
      </View>
      <View className="h-8 w-20 bg-white/5 rounded" />
    </View>
  );
}
