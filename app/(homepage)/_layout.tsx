import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CombatLayout from '../(combat)/_layout';
import PokedexLayout from '../(pokedex)/_layout';



const Tab = createBottomTabNavigator();

export default function TabLayout() {
    const colorScheme = useColorScheme();

    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
                headerShown: false,
                tabBarButton: HapticTab,
                tabBarBackground: TabBarBackground,
                tabBarStyle: Platform.select({
                    ios: {
                        // Use a transparent background on iOS to show the blur effect
                        position: 'absolute',
                    },
                    default: {},
                }),
            }}>
            <Tab.Screen
                name="CombatLayout"
                component={CombatLayout}
                
                options={{
                    title: 'Combat',
                    unmountOnBlur: true,
                    tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
                }}
            />
            <Tab.Screen
                name="PokedexLayout"
                component={PokedexLayout}
                options={{
                    title: 'Pokedex',
                    tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
                }}
            />
        </Tab.Navigator>
    );
}
