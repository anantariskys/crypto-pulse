import Providers from "@/providers/root";
import "./global.css";

import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <Providers>
      <View className="flex-1 bg-bg">
        <StatusBar style="light" />
        <Stack screenOptions={{ headerShown: false }} />
      </View>
    </Providers>
  );
}
