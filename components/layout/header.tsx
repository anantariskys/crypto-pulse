import { View, Text, Image } from "react-native";

export default function Header() {
  return (
  
      <View className=" pt-14 pb-3 flex-row items-center justify-between">
        <View className="flex-row items-center gap-3">
          <View className="w-10 h-10 rounded-full bg-primary/20 items-center justify-center">
            <Image
              source={{ uri: "https://i.imgur.com/4ZQZ4Zp.png" }}
              className="w-8 h-8 rounded-full"
            />
          </View>
          <Text className="text-white text-xl font-bold">
            CryptoPulse AI
          </Text>
        </View>

        <Image
          source={{ uri: "https://i.imgur.com/3GvwNBf.png" }}
          className="w-10 h-10 rounded-full border-2 border-primary/30"
        />
      </View>

  );
}
