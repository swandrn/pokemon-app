import { useNavigation } from "expo-router";
import { Button, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

export default function CombatWindow() {
    return (
        <SafeAreaView style={{ height: 100, flexDirection: 'row' }}>
            <View style={{ backgroundColor: 'blue', flex: 0.2 }} />
            <View style={{ backgroundColor: 'red', flex: 0.4 }} />
        </SafeAreaView>
    )
}
