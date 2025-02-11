import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Potions from './Potions';
import CombatWindow from './CombatWindow';
import { View } from 'react-native-reanimated/lib/typescript/Animated';
import { SafeAreaView } from 'react-native-safe-area-context';


const Tab = createBottomTabNavigator();

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'red' }} />
  );
}
