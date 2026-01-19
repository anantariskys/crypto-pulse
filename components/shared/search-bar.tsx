import { View, TextInput } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function SearchBar() {
  return (
    <View className=" py-3">
      <View className="flex-row items-center bg-surface rounded-xl h-12 px-4">
        <MaterialIcons name="search" size={20} color="#9CA3AF" />
        <TextInput
          placeholder="Search coins or pairs..."
          placeholderTextColor="#9CA3AF"
          className="ml-3 flex-1 text-white"
        />
      </View>
    </View>
  );
}
