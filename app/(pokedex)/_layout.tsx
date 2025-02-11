import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaView, Button } from "react-native";
import { useColorScheme } from "@/hooks/useColorScheme";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

const Tab = createBottomTabNavigator();

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [count, setCount] = useState(0);

  useFocusEffect(
    useCallback(() => {
      setCount(0); 

   /*    return () => {
        setCount(0); 
      }; */
    }, [])
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "blue" }}>
      <Text style={{ fontSize: 24, marginBottom: 10, color: "white" }}>Count: {count}</Text>
      <Button title="Increment Count" onPress={() => setCount(count + 1)} />
    </SafeAreaView>
  );
}
