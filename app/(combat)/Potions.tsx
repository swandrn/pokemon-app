import { View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

export default function Potions() {
    return (
        <SafeAreaView style={{ height: 100, flexDirection: 'row' }}>
            <View style={{ backgroundColor: 'black', flex: 0.2 }} />
            <View style={{ backgroundColor: 'brown', flex: 0.4 }} />
        </SafeAreaView>
    )
}

