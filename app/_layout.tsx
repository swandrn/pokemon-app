import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import { useColorScheme } from "@/hooks/useColorScheme";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HapticTab } from "@/components/HapticTab";
import React from "react";
import { Image, Platform, View } from "react-native";

import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";

import CombatLayout from "./(combat)/_layout";
import PokedexLayout from "./(pokedex)/_layout";
import PC from "./(pc)/pc";

// Removed Pokeball import since file doesn't exist

const Stack = createStackNavigator();

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  const Tab = createBottomTabNavigator();

  return (
    <ThemeProvider value={DefaultTheme}>
      <View style={{ flex: 1 }}>
        {/* Orange bar at the top */}
        <View
          style={{          
            height: 35, 
            width: "100%",
            borderTopWidth: 5,
            borderBottomWidth: 5,
            borderColor: "orange",
            backgroundColor: "#ffb04f",
          }}
        />
        <View style={{ flex: 1, backgroundColor: "", marginBottom: 0, borderRadius: 20 }}>
          <Tab.Navigator
            screenOptions={{
              tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
              headerShown: false,
              tabBarButton: HapticTab,
              tabBarBackground: TabBarBackground,
              tabBarStyle: Platform.select({
                ios: {
                  // Use a transparent background on iOS to show the blur effect
                  position: "absolute",
                  backgroundColor: "",
                },
                default: {
                  marginHorizontal: "auto",
                  borderRadius: 5,
                  width: "97%",
                  borderTopWidth: 5,
                  borderBottomWidth: 5,
                  borderColor: "orange",
                  backgroundColor: "#ffb04f",
                },
              }),
            }}>
            <Tab.Screen
              name="PC"
              component={PC}
              options={{
                title: "",
                tabBarIcon: ({ color }) => (
                  <View style={{}}>
                    <Image source={require("../assets/images/PC.png")} style={{ width: 40, height: 40, objectFit: "contain" }} />
                  </View>
                ),
              }}
            />
            <Tab.Screen
              name="Chest"
              component={PokedexLayout}
              options={{
                title: "",
                tabBarIcon: ({ color }) => (
                  <View style={{}}>
                    <Image source={require("../assets/images/Gatcha.png")} style={{ width: 40, height: 40, objectFit: "contain", marginRight: 15 }} />
                  </View>
                ),
              }}
            />
            <Tab.Screen
              name="Home"
              component={PokedexLayout}
              options={{
                title: "",
                tabBarIcon: ({ color }) => (
                  <View style={{}}>
                    <Image source={require("../assets/images/pokeball3.png")} style={{ width: 80, height: 80 }} />
                  </View>
                ),
              }}
            />
            <Tab.Screen
              name="CombatLayout"
              component={CombatLayout}
              options={{
                title: "",
                tabBarIcon: ({ color }) => (
                  <View style={{}}>
                    <Image source={require("../assets/images/Combat.png")} style={{ width: 40, height: 40, objectFit: "contain", marginLeft: 15 }} />
                  </View>
                ),
              }}
            />
            <Tab.Screen
              name="PokedexLayout"
              component={PokedexLayout}
              options={{
                title: "",
                tabBarIcon: ({ color }) => (
                  <View style={{}}>
                    <Image source={require("../assets/images/Items.png")} style={{ width: 40, height: 40, objectFit: "contain" }} />
                  </View>
                ),
              }}
            />
          </Tab.Navigator>
        </View>
      </View>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
