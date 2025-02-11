import { Tabs } from "expo-router";
import { IconSymbol } from "./ui/IconSymbol";
import { ReactNode, useState } from "react";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { useColorScheme } from "@/hooks/useColorScheme.web";
import { View } from "react-native-reanimated/lib/typescript/Animated";

export default function NavBar({  }: { }) {
  const [hideTabBar, setTabBar] = useState(true);
  const colorScheme = useColorScheme();
  return (
    
  <View style={'width'}></View>
  );
}
