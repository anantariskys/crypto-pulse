import { View, StatusBar, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface ScreenWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export default function ScreenWrapper({ children, className }: ScreenWrapperProps) {
  const insets = useSafeAreaInsets();
  return (
    <View 
      className={`flex-1 bg-bg ${className}`} 
      style={{ 
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : insets.top,
        paddingBottom: 0 // Tabs will handle bottom padding
      }}
    >
      {children}
    </View>
  );
}
