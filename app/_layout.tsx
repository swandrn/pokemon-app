import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Tabs, usePathname } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";
import { IconSymbol } from "@/components/ui/IconSymbol";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const pathname = usePathname();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  // Add paths where you want to hide the tab bar
  const hideTabBar = pathname.includes('/combats/');

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: hideTabBar ? { display: 'none' } : undefined,
          tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        }}>
        <Tabs.Screen
          name="(pokedex)"
          options={{
            title: "Pokedex",
            tabBarIcon: ({ color }) => <IconSymbol name="house.fill" size={28} color={color} />,
          }}
        />
        <Tabs.Screen
          name="(combats)"
          options={{
            title: "Combats",
            tabBarIcon: ({ color }) => <IconSymbol name="paperplane.fill" size={28} color={color} />,
          }}
        />
      </Tabs>
    </ThemeProvider>
  );
}
